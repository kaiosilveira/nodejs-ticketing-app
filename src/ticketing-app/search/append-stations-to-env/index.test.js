import chai from 'chai';
import appendStationsToEnv from '.';

chai.should();

describe('appendStationsToEnv', () => {
  it('should append stations to the env', () => {
    const env = { params: { origin: 1, destination: 2 } };
    const stations = [
      { id: 1, name: 'Madrid' },
      { id: 2, name: 'Barcelona' },
    ];

    const newEnv = appendStationsToEnv(env, stations);

    newEnv.stations.should.be.eql(stations);
  });
});
