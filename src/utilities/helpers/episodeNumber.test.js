import getEpisodeNumber from './episodeNumber';

describe('getEpisodeNumber test', () => {
  const mockData = {
    variant1: {
      episodeNumber: 2,
      seasonNumber: 3,
    },
    variant2: {
      episodeNumber: 133,
      seasonNumber: 7,
    },
    variant3: {
      episodeNumber: null,
      seasonNumber: null,
    },
  };

  test('single digit episode number', () => {
    const { variant1: { episodeNumber }, variant1: { seasonNumber } } = mockData;
    const received = getEpisodeNumber(episodeNumber, seasonNumber);
    expect(received).toBe('EP02 - S3');
  });

  test('3 digits episode number', () => {
    const { variant2: { episodeNumber }, variant2: { seasonNumber } } = mockData;
    const received = getEpisodeNumber(episodeNumber, seasonNumber);
    expect(received).toBe('EP133 - S7');
  });

  test('null episode', () => {
    const { variant3: { episodeNumber }, variant3: { seasonNumber } } = mockData;
    const received = getEpisodeNumber(episodeNumber, seasonNumber);
    expect(received).toBe(null);
  });
});
