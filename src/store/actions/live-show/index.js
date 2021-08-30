import * as liveStreamPlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import sha256 from 'js-sha256';

export const ADD_LIVE_SHOW_DATA = 'ADD_LIVE_SHOW_DATA';
export const PLAY_LIVE_SHOW = 'PLAY_LIVE_SHOW';
export const END_LIVE_SHOW = 'END_LIVE_SHOW';
export const UPDATE_LIVE_SHOW_DATA = 'UPDATE_LIVE_SHOW_DATA';

export const addLiveShow = payload => ({
  type: ADD_LIVE_SHOW_DATA,
  payload,
});

export const updateLiveShowData = payload => ({
  type: UPDATE_LIVE_SHOW_DATA,
  payload,
});

export function startLiveShow(showSlug, audioStream, profile) {
  return async (dispatch) => {
    liveStreamPlayer.updateSource(audioStream?.url, sha256(profile?.email));

    dispatch({
      type: PLAY_LIVE_SHOW,
    });
  };
}

export function endLiveShow() {
  return async (dispatch) => {
    liveStreamPlayer.updateSource('', '');

    dispatch({
      type: END_LIVE_SHOW,
    });
  };
}

