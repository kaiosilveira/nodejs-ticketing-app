import fs from 'fs';
import Path from 'path';

const CACHE = { stations: undefined };

const loadStations = () => {
  if (CACHE.stations) {
    console.log('cache hit. Resolving stations from memory');
    return CACHE.stations;
  } else {
    console.log('cache miss, loading stations file...');
    const stations = JSON.parse(
      fs.readFileSync(Path.resolve(__dirname, '../../carriers/_config/stations.json'))
    );

    CACHE.stations = stations;

    return CACHE.stations;
  }
};

export default loadStations;
