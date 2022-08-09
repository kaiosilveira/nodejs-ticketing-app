import mergeResults from '../merge-results';
import carriers from '../../carriers';
import resolveAll from '../../utils/resolve-all';
import setupSearchChildProcessForCarrier from './setup-search-hild-process-for-carrier';

export const searchUsingChildProcesses = async env => {
  return env
    |> carriers.map(setupSearchChildProcessForCarrier(#))
    |> resolveAll(#)
    |> await #
    |> mergeResults(#);
};

export default searchUsingChildProcesses;
