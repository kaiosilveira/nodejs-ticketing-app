import chai from 'chai';
import mergeResults from '.';

chai.should();

describe('mergeResults', () => {
  it('should flatten the results', () => {
    const resultSet1 = { result: [{ origin: 1, destination: 2, price: 10 }] };
    const resultSet2 = { result: [{ origin: 1, destination: 2, price: 20 }] };
    const resultSet3 = { result: [{ origin: 1, destination: 2, price: 25 }] };

    const finalResult = mergeResults([resultSet1, resultSet2, resultSet3]);

    finalResult.should.be.eql([...resultSet1.result, ...resultSet2.result, ...resultSet3.result]);
  });
});
