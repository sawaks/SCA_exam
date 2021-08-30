import getEpisodeInfo from './episodeInfo';

test('getEpisodeInfo test', () => {
  const episode = {
    episode: 12,
    season: 2,
  };
  const received = getEpisodeInfo(episode);
  expect(received).toBe('S.2  |  Ep.12');
});

test('getEpisodeInfo test', () => {
  const episode = {
    episode: null,
    season: 2,
  };
  const received = getEpisodeInfo(episode);
  expect(received).toBe('S.2');
});
