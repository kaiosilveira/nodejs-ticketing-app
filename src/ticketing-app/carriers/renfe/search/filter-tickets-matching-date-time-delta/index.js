import moment from 'moment';

const filterTicketsMatchingDateTimeDelta = env => {
  const timetable = env._renfe.timetable;
  const targetDate = env.params.date;
  const previousDay = moment(targetDate).subtract(1, 'day').subtract(23, 'hours');
  const nextDay = moment(targetDate).add(1, 'day').add(23, 'hours');

  return {
    ...env,
    _renfe: {
      ...env._renfe,
      result: timetable.filter(item => moment(item.date).isBetween(previousDay, nextDay)),
    },
  };
};

export default filterTicketsMatchingDateTimeDelta;
