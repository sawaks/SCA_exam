import {
  LIVE_STREAM_PAUSE,
  LIVE_STREAM_PLAY,
  LIVE_STREAM_PLAYER_LOADED,
  LIVE_STREAM_RESET,
  LIVE_STREAM_UPDATE_LOADING,
  LIVE_STREAM_UPDATE_SOURCE,
  // LIVE_STREAM_UPDATE_CURRENT_TIME,
} from 'store/actions/live-stream-player';

const initialState = {
  // currentTime: 0,
  playing: false,
  sourceUrl: '',
  loading: false,
  playerLoaded: false,
  callSign: null,
};

export default function liveStreamPlayer(state = initialState, action) {
  switch (action.type) {
    case LIVE_STREAM_UPDATE_SOURCE:
      if (state.sourceUrl !== action.sourceUrl) {
        return {
          ...state,
          sourceUrl: action.sourceUrl,
        };
      }
      return state;
    case LIVE_STREAM_PLAY:
      return {
        ...state,
        playing: true,
      };
    case LIVE_STREAM_PAUSE:
      return {
        ...state,
        playing: false,
      };
    case LIVE_STREAM_UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    // case LIVE_STREAM_UPDATE_CURRENT_TIME:
    //   return {
    //     ...state,
    //     currentTime: action.currentTime,
    //   };
    case LIVE_STREAM_PLAYER_LOADED:
      return {
        ...state,
        playerLoaded: true,
      };
    case LIVE_STREAM_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
