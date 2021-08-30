export const AUDIO_UPDATE_SOURCE = 'AUDIO_UPDATE_SOURCE';
export const AUDIO_PLAY = 'AUDIO_PLAY';
export const AUDIO_PAUSE = 'AUDIO_PAUSE';
export const AUDIO_END = 'AUDIO_END';
export const AUDIO_UPDATE_PLAYBACK_RATE = 'AUDIO_UPDATE_PLAYBACK_RATE';
export const AUDIO_SEEKED = 'AUDIO_SEEKED';
export const AUDIO_UPDATE_CURRENT_TIME = 'AUDIO_UPDATE_CURRENT_TIME';
export const AUDIO_UPDATE_DURATION = 'AUDIO_UPDATE_DURATION';
export const AUDIO_UPDATE_LOADING = 'AUDIO_UPDATE_LOADING';
export const AUDIO_DECREMENT_CHANGE_COUNTER = 'AUDIO_DECREMENT_CHANGE_COUNTER';
export const AUDIO_RESET_CHANGE_COUNTER = 'AUDIO_RESET_CHANGE_COUNTER';
export const AUDIO_PLAYER_LOADED = 'AUDIO_PLAYER_LOADED';
export const AUDIO_RESET = 'AUDIO_RESET';

export const audioUpdateSource = (sourceUrl, playheadPosition) => ({
  type: AUDIO_UPDATE_SOURCE,
  sourceUrl,
  playheadPosition,
});

export const audioPlayerLoaded = () => ({
  type: AUDIO_PLAYER_LOADED,
});

export const audioDecrementChangeCounter = () => ({
  type: AUDIO_DECREMENT_CHANGE_COUNTER,
});

export const audioPlay = () => ({
  type: AUDIO_PLAY,
});

export const audioPause = () => ({
  type: AUDIO_PAUSE,
});

export const audioEnd = () => ({
  type: AUDIO_END,
});

export const audioUpdatePlaybackRate = playbackRate => ({
  type: AUDIO_UPDATE_PLAYBACK_RATE,
  playbackRate,
});

export const audioSeeked = () => ({
  type: AUDIO_SEEKED,
});

export const audioUpdateCurrentTime = currentTime => ({
  type: AUDIO_UPDATE_CURRENT_TIME,
  currentTime,
});

export const audioUpdateDuration = time => ({
  type: AUDIO_UPDATE_DURATION,
  time,
});

export const audioUpdateLoading = loading => ({
  type: AUDIO_UPDATE_LOADING,
  loading,
});

export const audioReset = () => ({
  type: AUDIO_RESET,
});
