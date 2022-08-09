import chai from 'chai';
import { noop } from 'mocha/lib/utils';
import filterTicketsMatchingDateTimeDelta from '.';

chai.should();

describe('filterTicketsMatchingDateTimeDelta', () => {
  it('should filter timetable tickets considering the previous and next days based on the target date', () => {
    const date = new Date('2022-08-30T00:30:00.000Z');
    const env = {
      params: { date },
      _logger: { info: noop },
      _renfe: {
        timetable: [
          { date: '2022-08-28T00:00:00.000Z', origin: 1200, destination: 1300, price: 151725 },
          { date: '2022-08-29T00:00:00.000Z', origin: 1200, destination: 1300, price: 151725 },
          { date: '2022-08-30T00:00:00.000Z', origin: 1200, destination: 1300, price: 174332 },
          { date: '2022-08-31T01:00:00.000Z', origin: 1200, destination: 1300, price: 134827 },
          { date: '2022-09-01T01:00:00.000Z', origin: 1200, destination: 1300, price: 134827 },
        ],
      },
    };

    const updatedEnv = filterTicketsMatchingDateTimeDelta(env);
    updatedEnv._renfe.result.length.should.be.eql(3);
  });
});
