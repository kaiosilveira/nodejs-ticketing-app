import chai from 'chai';
import removePrivateValues from '.';

const should = chai.should();

describe('removePrivateValues', () => {
  it('should remove all private values from the resulting env', () => {
    const env = {
      params: { origin: 1, destination: 2 },
      _renfe: { timetable: [{ id: 1, date: new Date() }] },
      _logger: { info: () => {} },
    };
    const newEnv = removePrivateValues(env);

    should.not.exist(newEnv._logger);
    should.not.exist(newEnv._renfe);
  });
});
