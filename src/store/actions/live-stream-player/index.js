export const LIVE_STREAM_UPDATE_SOURCE = 'LIVE_STREAM_UPDATE_SOURCE';
export const LIVE_STREAM_PLAY = 'LIVE_STREAM_PLAY';
export const LIVE_STREAM_PAUSE = 'LIVE_STREAM_PAUSE';
export const LIVE_STREAM_END = 'LIVE_STREAM_END';
export const LIVE_STREAM_UPDATE_LOADING = 'LIVE_STREAM_UPDATE_LOADING';
export const LIVE_STREAM_PLAYER_LOADED = 'LIVE_STREAM_PLAYER_LOADED';
export const LIVE_STREAM_RESET = 'LIVE_STREAM_RESET';
// export const LIVE_STREAM_UPDATE_CURRENT_TIME = 'LIVE_STREAM_UPDATE_CURRENT_TIME';

export const updateLiveStreamSource = sourceUrl => ({
  type: LIVE_STREAM_UPDATE_SOURCE,
  sourceUrl,
});

export const liveStreamPlayerLoaded = () => ({
  type: LIVE_STREAM_PLAYER_LOADED,
});

export const liveStreamPlay = () => ({
  type: LIVE_STREAM_PLAY,
});

export const liveStreamPause = () => ({
  type: LIVE_STREAM_PAUSE,
});

export const liveStreamEnd = () => ({
  type: LIVE_STREAM_END,
});

export const liveStreamUpdateLoading = loading => ({
  type: LIVE_STREAM_UPDATE_LOADING,
  loading,
});

export const liveStreamReset = () => ({
  type: LIVE_STREAM_RESET,
});

// export const liveStreamUpdateCurrentTime = currentTime => ({
//   type: LIVE_STREAM_UPDATE_CURRENT_TIME,
//   currentTime,
// });
