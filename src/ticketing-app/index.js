import * as ChildProcess from 'child_process';
import Carriers from './carriers';

const resolveAll = promiseArray => Promise.all(promiseArray)
const mergeResults = results => results.reduce((previous, current) => {
  return [...current.result, ...previous.result];
}, { result: [] });

const search = async env => {
  return Carriers.map(carrier => carrier.search(env))
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
