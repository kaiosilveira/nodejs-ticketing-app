import fetchTimetable from './fetch-timetable';
import filterTicketsMatchingDateTimeDelta from './filter-tickets-matching-date-time-delta';
import parseTickets from './parse-tickets';
import removePrivateValues from './remove-private-values';

const search = async env => {
  return fetchTimetable(env)
    |> await(#)
    |> filterTicketsMatchingDateTimeDelta(#)
    |> parseTickets(#)
    |> removePrivateValues(#);
};

export default search;
