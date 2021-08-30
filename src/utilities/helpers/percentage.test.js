import percentage from './percentage';

describe('calculate percentage', () => {
  const mockData = {
    variant1: {
      partial: 30,
      total: 150,
    },
  };

  test('30 of 150 is 20 percent', () => {
    const { variant1: { partial }, variant1: { total } } = mockData;
    const received = percentage(partial, total);
    expect(received).toBe(20);
  });
});
