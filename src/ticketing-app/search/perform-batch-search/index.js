import carriers from '../../carriers';

const performBatchSearch = env => carriers.map(carrier => carrier.search(env));

export default performBatchSearch;
