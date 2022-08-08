import fs from 'fs';

const createRandomDelay = () => parseInt(Math.random() * 999, 10);

const fetchTimetable = async env => {
  return new Promise(resolve => {
    fs.readFile('./mocks/renfe/timetable.json', (err, data) => {
      if (err) throw err;
      setTimeout(
        () => resolve({ ...env, ['_renfe']: { timetable: JSON.parse(data) } }),
        process.env.USE_RANDOM_DELAY ? createRandomDelay() : 50
      );
    });
  });
};

module.exports = fetchTimetable;
