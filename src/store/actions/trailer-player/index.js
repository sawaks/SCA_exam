export const TRAILER_UPDATE_SOURCE = 'TRAILER_UPDATE_SOURCE';
export const TRAILER_PLAY = 'TRAILER_PLAY';
export const TRAILER_PAUSE = 'TRAILER_PAUSE';
export const TRAILER_END = 'TRAILER_END';
export const TRAILER_UNMUTE = 'TRAILER_UNMUTE';
export const TRAILER_UPDATE_CURRENT_TIME = 'TRAILER_UPDATE_CURRENT_TIME';
export const TRAILER_UPDATE_DURATION = 'TRAILER_UPDATE_DURATION';
export const TRAILER_UPDATE_LOADING = 'TRAILER_UPDATE_LOADING';
export const TRAILER_PLAYER_LOADED = 'TRAILER_PLAYER_LOADED';

export const trailerUpdateSource = (sourceUrl, playheadPosition) => ({
  type: TRAILER_UPDATE_SOURCE,
  sourceUrl,
  playheadPosition,
});

export const trailerPlayerLoaded = () => ({
  type: TRAILER_PLAYER_LOADED,
});

export const trailerPlay = () => ({
  type: TRAILER_PLAY,
});

export const trailerPause = () => ({
  type: TRAILER_PAUSE,
});

export const trailerEnd = () => ({
  type: TRAILER_END,
});

export const trailerUpdateCurrentTime = currentTime => ({
  type: TRAILER_UPDATE_CURRENT_TIME,
  currentTime,
});

export const trailerUpdateDuration = time => ({
  type: TRAILER_UPDATE_DURATION,
  time,
});

export const trailerUpdateLoading = (loading, perc) => ({
  type: TRAILER_UPDATE_LOADING,
  loading,
  loadingPerc: perc || 0,
});
