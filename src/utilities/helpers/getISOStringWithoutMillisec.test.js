import getISOStringWithoutMillisec from './getISOStringWithoutMillisec';

describe('getISOStringWithoutMillisec', () => {
  test('it should remove milliseconds from  ISO 8601 date', () => {
    const testDate = new Date('August 19, 1975 20:15:30.455Z');
    const formattedDate = getISOStringWithoutMillisec(testDate);
    expect(formattedDate)
      .toEqual('1975-08-19T20:15:30Z');
  });
});
