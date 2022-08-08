const filterTicketsMatchingDateTimeDelta = env => {
  const timetable = env['_renfe'].timetable;
  const dateTime = env.params.date;

  return {
    ...env,
    ['_renfe']: {
      ...env['_renfe'],
      result: timetable.filter(item => {
        return (
          item.date.getFullYear() === dateTime.getFullYear() &&
          item.date.getMonth() === dateTime.getMonth() &&
          item.date.getDate() === dateTime.getDate() &&
          item.date.getHours() === dateTime.getHours()
        );
      }),
    },
  };
};

module.exports = filterTicketsMatchingDateTimeDelta;
