import performBatchSearch from '../perform-batch-search';
import resolveAll from '../../utils/resolve-all';
import mergeResults from '../merge-results';

const inProcessSearch = async env => {
  return env
    |> performBatchSearch(#)
    |> resolveAll(#)
    |> await(#)
    |> mergeResults(#);
}

export default inProcessSearch;