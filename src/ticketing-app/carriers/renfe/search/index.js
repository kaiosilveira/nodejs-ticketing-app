import fetchTimetable from './fetch-timetable';
import filterTicketsMatchingDateTimeDelta from './filter-tickets-matching-date-time-delta';
import parseTickets from './parse-tickets';
import removePrivateValues from './remove-private-values';

const finalize = env => {
  env.logger.info('finalizing')
  return env;
}

const search = async env => {
  env.logger.info('initializing search...');
  return fetchTimetable(env)
    |> await(#)
    |> filterTicketsMatchingDateTimeDelta(#)
    |> parseTickets(#)
    |> removePrivateValues(#)
    |> finalize(#);
};

export default search;
