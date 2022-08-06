const express = require("express");
const { fork } = require("child_process");

const app = express();

const CARRIERS = ["ouigo", "renfe", "avlo"];

class SearchGateway {
  constructor() {
    this.search = this.search.bind(this);
  }

  async search({ origin, destination, date }) {
    const aggregatedTickets = [];

    const deferredProcesses = CARRIERS.map((carrier) => {
      return new Promise((resolve) => {
        const carrierProcess = fork(`./carriers/${carrier}/index.js`);

        carrierProcess.on("exit", resolve);
        carrierProcess.on("message", (tickets) => {
          console.log(
            `${tickets.length} tickets received from ${carrier}. Aggregating results...`
          );
          aggregatedTickets.push(tickets);
        });

        carrierProcess.send({
          type: "FETCH_AVAILABLE_TICKETS",
          payload: { origin, destination, date },
        });
      });
    });

    await Promise.all(deferredProcesses);

    return aggregatedTickets.reduce(
      (previous, current) => [...current, ...previous],
      []
    );
  }
}

app.get("/search", async (req, res) => {
  const searchGateway = new SearchGateway();

  const result = await searchGateway.search({
    origin: req.query.origin,
    destination: req.query.destination,
    date: new Date(req.query.date),
  });

  return res.json(result);
});

module.exports = app;
