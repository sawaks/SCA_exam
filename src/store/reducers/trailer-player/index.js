import {
  TRAILER_PAUSE,
  TRAILER_PLAY,
  TRAILER_PLAYER_LOADED,
  TRAILER_UNMUTE,
  TRAILER_UPDATE_CURRENT_TIME,
  TRAILER_UPDATE_DURATION,
  TRAILER_UPDATE_LOADING,
  TRAILER_UPDATE_SOURCE,
} from 'store/actions/trailer-player';

const initialState = {
  currentTime: 0,
  duration: 0,
  buffer: 0,
  volume: 1,
  playbackRate: 1,
  muted: false,
  playing: false,
  sourceUrl: '',
  nowLive: null,
  loading: false,
  loadingPerc: 0,
  // Sign up screen is based on the number of audio source changes
  // first audio change is can't be counted because it is not made by the user
  audioChangeCount: 0,
  playerLoaded: false,
};

export default function trailerPlayer(state = initialState, action) {
  switch (action.type) {
    case TRAILER_UPDATE_SOURCE:

      if (state.sourceUrl !== action.sourceUrl) {
        // Sign up screen is based on the number of audio source changes
        // if sourceUrl === '' means that the mini player is closed, therefore it should not increment the counter
        const audioChangeCount = action.sourceUrl === '' ? state.audioChangeCount : state.audioChangeCount + 1;
        return {
          ...state,
          sourceUrl: action.sourceUrl,
          currentTime: action.playheadPosition,
          audioChangeCount,
        };
      }
      return state;
    case TRAILER_PLAY:
      return {
        ...state,
        playing: true,
      };
    case TRAILER_PAUSE:
      return {
        ...state,
        playing: false,
        currentTime: 0,
      };
    case TRAILER_UNMUTE:
      return {
        ...state,
        muted: false,
      };
    case TRAILER_UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case TRAILER_UPDATE_DURATION:
      return {
        ...state,
        duration: action.time,
      };
    case TRAILER_UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
        loadingPerc: action.loadingPerc,
      };
    case TRAILER_PLAYER_LOADED:
      return {
        ...state,
        playerLoaded: true,
      };
    default:
      return state;
  }
}
