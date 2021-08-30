import { TOGGLE_AUTO_PLAY, UPDATE_ACTIVE_PLAYLIST_SESSION_INFO } from 'store/actions/active-playlist';

const initialState = {
  autoplayEnabled: true,
  episodesList: [],
  visiblePlaylist: [],
};

export default function activePlaylist(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTO_PLAY:
      return {
        ...state,
        autoplayEnabled: !state.autoplayEnabled,
      };
    case UPDATE_ACTIVE_PLAYLIST_SESSION_INFO: {
      return {
        ...state,
        episodesList: action.ids,
      };
    }
    default:
      return state;
  }
}
