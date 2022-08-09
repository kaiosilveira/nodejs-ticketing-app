import * as ChildProcess from 'child_process';
import carriers from './carriers';
import Path from 'path';
import fs from 'fs';

const CACHE = { stations: undefined };

const loadStations = () => {
  if (CACHE.stations) {
    console.log('cache hit. Resolving stations from memory');
    return CACHE.stations;
  }  else {
    console.log('cache miss, loading stations file...');
    const stations = JSON.parse(
      fs.readFileSync(Path.resolve(__dirname, 'carriers/_config/stations.json'))
    );

    CACHE.stations = stations;

    return CACHE.stations;
  }
}

const appendStationsToEnv = (env, stations) => ({ ...env, stations })
const performBatchSearch = env => carriers.map(carrier => carrier.search(env))
const resolveAll = promiseArray => Promise.all(promiseArray)
const mergeResults = results => results.reduce((previous, current) => {
  return [...current.result, ...previous.result];
}, { result: [] });

const search = async params => {
  const env = { params };
  return loadStations()
    |> appendStationsToEnv(env, #)
    |> performBatchSearch(#)
    |> resolveAll(#)
    |> await(#)
    |> mergeResults(#);
}

const spawnSearchWorkers = async ({ origin, destination, date }) => {
  const CARRIERS = ['renfe'];
  const aggregatedTickets = [];

  const deferredProcesses = CARRIERS.map(carrier => {
    return new Promise(resolve => {
      const carrierProcess = ChildProcess.fork(`./src/ticketing-app/carriers/${carrier}/index.js`);

      carrierProcess.on('exit', resolve);
      carrierProcess.on('message', tickets => {
        console.log(`${tickets.length} tickets received from ${carrier}. Aggregating results...`);
        aggregatedTickets.push(tickets);
      });

      carrierProcess.send({
        type: 'SEARCH',
        payload: { origin, destination, date },
      });
    });
  });

  await Promise.all(deferredProcesses);

  return aggregatedTickets.reduce((previous, current) => [...current, ...previous], []);
};

export default { search, spawnSearchWorkers };
