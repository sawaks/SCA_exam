// const episodeComplete = require('./episodeComplete');
import episodeComplete from './episodeComplete';

const mockData = {
  test1: { playheadSeconds: 0, durationSeconds: 100 },
  test2: { playheadSeconds: 0, durationSeconds: 0 },
  test3: { playheadSeconds: 95, durationSeconds: 100 },
  test4: { playheadSeconds: 82, durationSeconds: 100 },
  test5: { playheadSeconds: 34, durationSeconds: 100 },
};

test('either or both playheadSeconds and/or durationSeconds is 0', () => {
  const { playheadSeconds, durationSeconds } = mockData.test1;
  const received = episodeComplete(playheadSeconds, durationSeconds);
  const expected = false; // playheadSeconds is 0
  expect(received).toBe(expected);
});

test('either or both playheadSeconds and/or durationSeconds is 0', () => {
  const { playheadSeconds, durationSeconds } = mockData.test2;
  const received = episodeComplete(playheadSeconds, durationSeconds);
  const expected = false; // both playheadSeconds and durationSeconds is 0
  expect(received).toBe(expected);
});

test('equal or more than 95% completed', () => {
  const { playheadSeconds, durationSeconds } = mockData.test3;
  const received = episodeComplete(playheadSeconds, durationSeconds);
  const expected = true; // 95% completed
  expect(received).toBe(expected);
});

test('less than 30 seconds remained', () => {
  const { playheadSeconds, durationSeconds } = mockData.test4;
  const received = episodeComplete(playheadSeconds, durationSeconds);
  const expected = true; // 28 seconds remains
  expect(received).toBe(expected);
});

test('95% wasn\'t not completed and more than 30 seconds remained', () => {
  const { playheadSeconds, durationSeconds } = mockData.test5;
  const received = episodeComplete(playheadSeconds, durationSeconds);
  const expected = false; // 34% completed and 66 seconds remains
  expect(received).toBe(expected);
});
