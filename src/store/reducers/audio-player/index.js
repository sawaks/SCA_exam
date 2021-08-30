import {
  AUDIO_DECREMENT_CHANGE_COUNTER,
  AUDIO_PAUSE,
  AUDIO_PLAY,
  AUDIO_PLAYER_LOADED, AUDIO_RESET,
  AUDIO_RESET_CHANGE_COUNTER,
  AUDIO_UPDATE_CURRENT_TIME,
  AUDIO_UPDATE_DURATION,
  AUDIO_UPDATE_LOADING,
  AUDIO_UPDATE_PLAYBACK_RATE,
  AUDIO_UPDATE_SOURCE,
} from 'store/actions/audio-player';

const initialState = {
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  playing: false,
  sourceUrl: '',
  loading: false,
  playerLoaded: false,
  audioChangeCount: 0,
};

export default function audioPlayer(state = initialState, action) {
  switch (action.type) {
    case AUDIO_UPDATE_SOURCE:

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
    case AUDIO_DECREMENT_CHANGE_COUNTER:
      return {
        ...state,
        audioChangeCount: state.audioChangeCount - 1,
      };
    case AUDIO_RESET_CHANGE_COUNTER:
      return {
        ...state,
        audioChangeCount: 0,
      };
    case AUDIO_PLAY:
      return {
        ...state,
        playing: true,
      };
    case AUDIO_PAUSE:
      return {
        ...state,
        playing: false,
      };
    case AUDIO_UPDATE_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.playbackRate,
      };
    case AUDIO_UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case AUDIO_UPDATE_DURATION:
      return {
        ...state,
        duration: action.time,
      };
    case AUDIO_UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case AUDIO_PLAYER_LOADED:
      return {
        ...state,
        playerLoaded: true,
      };
    case AUDIO_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
