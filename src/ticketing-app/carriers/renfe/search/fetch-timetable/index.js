import fs from 'fs';
import Path from 'path';

const createRandomDelay = () => parseInt(Math.random() * 999, 10);

const fetchTimetable = async env => {
  return new Promise(resolve => {
    env._logger.info('fetching timetable');
    fs.readFile(Path.resolve(__dirname, 'timetable.json'), (err, data) => {
      if (err) throw err;
      setTimeout(
        () => resolve({ ...env, ['_renfe']: { timetable: JSON.parse(data) } }),
        process.env.USE_RANDOM_DELAY ? createRandomDelay() : 50
      );
    });
  });
};

export default fetchTimetable;
