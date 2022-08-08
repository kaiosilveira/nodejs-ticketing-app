import moment from 'moment';

const filterTicketsMatchingDateTimeDelta = env => {
  const timetable = env['_renfe'].timetable;
  const targetDate = env.params.date;
  const previousDay = moment(targetDate).subtract(1, 'day');
  const nextDay = moment(targetDate).add(1, 'day');

  return {
    ...env,
    ['_renfe']: {
      ...env['_renfe'],
      result: timetable.filter(item => moment(item.date).isBetween(previousDay, nextDay)),
    },
  };
};

module.exports = filterTicketsMatchingDateTimeDelta;
