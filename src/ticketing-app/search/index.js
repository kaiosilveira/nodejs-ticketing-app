import searchUsingChildProcesses from './search-using-child-processes';
import inProcessSearch from './in-process-search';
import loadStations from './load-stations';
import appendStationsToEnv from './append-stations-to-env';
import ternaryFnExecution from '../utils/ternary-fn-execution';

const search = params => {
  return loadStations
    |> appendStationsToEnv({ params }, #)
    |> ternaryFnExecution(
      process.env.USE_CHILD_PROCESSES, searchUsingChildProcesses, inProcessSearch, #
    )
};

export default search;
