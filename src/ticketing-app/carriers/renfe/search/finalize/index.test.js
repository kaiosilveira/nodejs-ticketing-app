import chai from 'chai';
import spies from 'chai-spies';
import { noop } from 'mocha/lib/utils';
import finalize from '.';

chai.use(spies);
chai.should();

describe('finalize', () => {
  it('should log and finalize', () => {
    const env = { result: [], logger: chai.spy.interface({ info: noop }) };
    const newEnv = finalize(env);
    newEnv.should.be.eql(env);
    env.logger.info.should.have.been.called();
  });
});
