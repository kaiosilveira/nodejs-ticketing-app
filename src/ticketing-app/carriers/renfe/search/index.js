const fetchTimetable = async () => {
  return new Promise(resolve => {
    const timetable = [];

    for (let i = 0; i < 23; i++) {
      timetable.push({
        date: new Date(2022, 8, 1, i, 30, 0),
        origin: 1200,
        destination: 1300,
        price: 100000 + parseInt(Math.random() * 99999, 10),
      });
    }

    setTimeout(() => resolve(timetable), 50);
  });
};

const filterTicketsMatchingDateTimeDelta = ({ timetable, dateTime }) => {
  return timetable.filter(item => {
    return (
      item.date.getFullYear() === dateTime.getFullYear() &&
      item.date.getMonth() === dateTime.getMonth() &&
      item.date.getDate() === dateTime.getDate() &&
      item.date.getHours() === dateTime.getHours()
    );
  });
};

const parseTickets = tickets => {
  return tickets.map(ticket => ({
    date: ticket.date,
    origin: ticket.origin,
    destination: ticket.destination,
    price: ticket.price,
    carrier: 'renfe',
  }));
};

const search = async ({ origin, destination, date }) => {
  const timetable = await fetchTimetable();
  const ticketsMatchingSelectedTime = filterTicketsMatchingDateTimeDelta({
    timetable,
    dateTime: date,
  });

  const parsedTickets = parseTickets(ticketsMatchingSelectedTime);
  return parsedTickets;
};

module.exports = { search };
