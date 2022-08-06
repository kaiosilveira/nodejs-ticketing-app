class SearchService {
  constructor() {
    this.fetchAvailableTickets = this.fetchAvailableTickets.bind(this);
  }

  async fetchAvailableTickets() {
    console.log("AVLO: fetching tickets with carrier");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            origin: "Madrid Atocha",
            destination: "Barcelona Sants",
            price: 135700,
            operator: "Avlo",
          },
        ]);
      }, 1500);
    });
  }
}

const FETCH_AVAILABLE_TICKETS = "FETCH_AVAILABLE_TICKETS";
const MESSAGE_HANDLER_MAPPING = {
  [FETCH_AVAILABLE_TICKETS]: async () => {
    console.log("AVLO: received FETCH_AVAILABLE_TICKETS");
    const searchService = new SearchService();
    const tickets = await searchService.fetchAvailableTickets();
    console.log("AVLO: sending results to parent process");
    process.send(tickets);
    process.exit(0);
  },
};

process.on("message", async (msg) => {
  const handlerFn = MESSAGE_HANDLER_MAPPING[FETCH_AVAILABLE_TICKETS];
  if (typeof handlerFn !== "function") return;
  handlerFn(msg);
});
