const ChildProcess = require('child_process');

const CARRIERS = ['renfe'];

const search = async ({ origin, destination, date }) => {
  const deferredSearches = CARRIERS.map(carrier => {
    const CarrierSearch = require(`./carriers/${carrier}/search`);
    return CarrierSearch.search({ origin, destination, date });
  });

  const result = await Promise.all(deferredSearches);
  return result.reduce((previous, current) => [...current, ...previous], []);
};

const spawnSearchWorkers = async ({ origin, destination, date }) => {
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

const reserve = async ({ carrier }) => {
  await new Promise(resolve => {
    const carrierProcess = ChildProcess.fork(`./src/ticketing-app/carriers/${carrier}/index.js`);

    carrierProcess.on('exit', resolve);
    carrierProcess.on('message', reservationResult => {
      resolve(reservationResult);
    });

    carrierProcess.send({ type: 'RESERVE' });
  });
};

module.exports = { search, spawnSearchWorkers, reserve };
