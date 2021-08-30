const { easeInQuart, easeOutQuart } = require('./easingFunctions');

test('should multiplies a number four times', () => {
  const number = 3;
  const expected = number * number * number * number; // 81
  expect(easeInQuart(number)).toBe(expected);
});

test('should multiplies a number four times', () => {
  const number = 5;
  const expected = 1 - ((1 - number) ** 4);
  expect(easeOutQuart(number)).toBe(expected);
});
