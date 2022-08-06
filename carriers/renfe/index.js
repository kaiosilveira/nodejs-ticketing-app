const fetchAvailableTickets = async () => {
  console.log("RENFE: fetching tickets with carrier");
  return new Promise((resolve) => {
    const tickets = [];
    for (let i = 0; i < 10; i++) {
      tickets.push({
        id: i + 1,
        origin: "Madrid Atocha",
        destination: "Barcelona Sants",
        price: 126000,
        operator: "Renfe",
      });
    }

    resolve(tickets);
  });
};

process.on("message", async (msg) => {
  switch (msg.type) {
    case "FETCH_AVAILABLE_TICKETS":
      console.log(`RENFE: received FETCH_AVAILABLE_TICKETS`);
      const tickets = await fetchAvailableTickets();
      console.log("RENFE: sending results to parent process");
      process.send(tickets);
      process.exit(0);
    default:
      return;
  }
});
