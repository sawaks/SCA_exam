import moment from 'moment';

import { convertSecondsToMinutes, calculateAge, convertDate, formatSecondsToTime, timeAgo } from './date-time';

// convertSecondsToMinutes
test('convertSecondsToMinutes test', () => {
  const seconds = 310;
  const received = convertSecondsToMinutes(seconds);
  const expected = Math.ceil(seconds / 60); // 5
  expect(received).toBe(expected);
});

// calculateAge
test('calculateAge test', () => {
  const dob = '10/10/1980';
  const received = calculateAge(dob);
  const expected = moment().diff(dob, 'years'); // 40
  expect(received).toBe(expected);
});

// convertDate
describe('convertDate test', () => {
  const date = {
    validDate: new Date(),
    invalidDate: null,
  };

  test('convert a proper date to "D MMM YY" format', () => {
    const received = convertDate(date.validDate);
    const expected = moment(date).format('D MMM YY'); //  i.e. 6 Apr 21
    expect(received).toBe(expected);
  });

  test('convert an empty date', () => {
    const received = convertDate(date.invalidDate);
    expect(received).toBe('');
  });
});

// formatSecondsToTime
describe('formatSecondsToTime test', () => {
  const seconds = {
    variant1: 34567,
    variant2: -7,
    variant3: null,
  };

  test('seconds to time', () => {
    const received = formatSecondsToTime(seconds.variant1);
    expect(received).toBe('09:36:07');
  });

  test('negative seconds to time', () => {
    const received = formatSecondsToTime(seconds.variant2);
    expect(received).toBe('-00:07');
  });
  test('seconds to time', () => {
    const received = formatSecondsToTime(seconds.variant3);
    expect(received).toBe('00:00');
  });
});

// timeAgo
describe('timeAgo test', () => {
  const date = {
    validDate: new Date(),
    validDate2: new Date('10/12/1980'),
    invalidDate: null,
  };

  test('timeAgo from current time', () => {
    const received = timeAgo(date.validDate);
    const expected = moment(date.validDate).fromNow(); // 'a few seconds ago'
    expect(received).toBe(expected);
  });
  test('timeAgo from a specific date', () => {
    const received = timeAgo(date.validDate2);
    const expected = moment(date.validDate2).fromNow(); //  "40 years ago"
    expect(received).toBe(expected);
  });

  test('invalid date', () => {
    const received = timeAgo(date.invalidDate);
    expect(received).toBe('');
  });
});
