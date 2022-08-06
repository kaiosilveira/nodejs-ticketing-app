const fetchAvailableTickets = async () => {
  console.log("OUIGO: fetching tickets with carrier");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          origin: "Madrid Atocha",
          destination: "Barcelona Sants",
          price: 123000,
          operator: "Ouigo",
        },
      ]);
    }, 1000);
  });
};

process.on("message", async (msg) => {
  switch (msg.type) {
    case "FETCH_AVAILABLE_TICKETS":
      console.log("OUIGO: received FETCH_AVAILABLE_TICKETS");
      const tickets = await fetchAvailableTickets();
      console.log("OUIGO: sending results to parent process");
      process.send(tickets);
      process.exit(0);
    default:
      return;
  }
});
