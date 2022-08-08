const fetchTimetable = async env => {
  return new Promise(resolve => {
    const timetable = [];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= 23; j++) {
        timetable.push({
          date: new Date(2022, 8, i, j, 30, 0),
          origin: 1200,
          destination: 1300,
          price: 100000 + parseInt(Math.random() * 99999, 10),
        });
      }
    }

    setTimeout(() => resolve({ ...env, ['_renfe']: { timetable } }), 50);
  });
};

module.exports = fetchTimetable;
