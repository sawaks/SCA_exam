import { EPISODE_ORIGIN, LIVE_STREAM_ORIGIN, PLAYER_OVERLAY_TYPE } from 'utilities/constants';
import { updateCurrentEpisode } from '../episode';
import { addActiveStation, updateActiveStation, updateMoreStations } from '../more-stations';
import { subscribePlayerOverlay, unSubscribeSingle } from '../now-playing';
import { startLiveShow } from '../live-show';
import { displaySignupModal } from '../userInteractions';
import { updateStation } from '../station';

export const PLAYER_OVERLAY_UPDATE_VISIBLE = 'PLAYER_OVERLAY_UPDATE_VISIBLE';
export const PLAYER_OVERLAY_UPDATE_TYPE = 'PLAYER_OVERLAY_UPDATE_TYPE';

export const playerOverlayUpdateVisible = visible => ({
  type: PLAYER_OVERLAY_UPDATE_VISIBLE,
  visible,
});

export const playerOverlayUpdateType = playerType => ({
  type: PLAYER_OVERLAY_UPDATE_TYPE,
  playerType,
});

export function openPlayer({
  episodeId,
  episodePlayHeadPosition = 0,
  episodeDuration = null,
  playlistSlug = '',
  episodeOrigin = EPISODE_ORIGIN.default,
} = {}) {
  return async (dispatch, getState) => {
    const { profile } = getState();
    const isLoggedIn = profile?.userId;
    const assumeLoggedIn = profile?.assumeLoggedIn;
    const inProgress = profile?.inProgress;

    const headPosition = Math.trunc(episodePlayHeadPosition);
    const duration = Math.trunc(episodeDuration);
    const playheadPosition = (headPosition === duration) ? 0 : headPosition;

    if (!isLoggedIn && assumeLoggedIn && inProgress) {
      return;
    }

    if (!isLoggedIn && !assumeLoggedIn) {
      dispatch(displaySignupModal());
      return;
    }

    dispatch(updateCurrentEpisode(episodeId, playheadPosition, playlistSlug, episodeOrigin));
    dispatch(playerOverlayUpdateVisible(true));
    dispatch(playerOverlayUpdateType(PLAYER_OVERLAY_TYPE.PODCAST));
  };
}

export function openLiveStreamPlayer(stationSlug, origin = LIVE_STREAM_ORIGIN.default) {
  return async (dispatch, getState) => {
    const { profile, station } = getState();
    const isLoggedIn = profile?.userId;
    const assumeLoggedIn = profile?.assumeLoggedIn;

    if (!isLoggedIn && !assumeLoggedIn) {
      dispatch(displaySignupModal());
      return;
    }

    dispatch(playerOverlayUpdateVisible(true));
    dispatch(playerOverlayUpdateType(PLAYER_OVERLAY_TYPE.LIVE_STREAM));

    // unSubscribe from previous station
    if (station.audioStreams) {
      dispatch(unSubscribeSingle(station.audioStreams[0].callSign));
    }

    const updatedStation = await dispatch(updateStation(stationSlug));
    const callSign = updatedStation?.audioStreams[0]?.callSign?.toLowerCase();
    dispatch(subscribePlayerOverlay(callSign));

    if (origin === LIVE_STREAM_ORIGIN.myFeed) {
      const { myFeed: { stations: { top, bottom } } } = getState();
      dispatch(updateMoreStations([...top.entries, ...bottom.entries]));
      dispatch(updateActiveStation(stationSlug));
      return;
    }

    if (origin === LIVE_STREAM_ORIGIN.default) {
      dispatch(updateMoreStations(updatedStation?.relatedStations));
      dispatch(addActiveStation(updatedStation));
      return;
    }

    if (origin === LIVE_STREAM_ORIGIN.moreStationsList) {
      dispatch(updateActiveStation(stationSlug));
    }
  };
}

export function openLiveShowPlayer(showSlug, audioStream) {
  return async (dispatch, getState) => {
    const { profile } = getState();
    const isLoggedIn = profile?.userId;
    const assumeLoggedIn = profile?.assumeLoggedIn;

    if (!isLoggedIn && !assumeLoggedIn) {
      dispatch(displaySignupModal());
      return;
    }

    await dispatch(startLiveShow(showSlug, audioStream, profile));
    dispatch(playerOverlayUpdateVisible(true));
    dispatch(playerOverlayUpdateType(PLAYER_OVERLAY_TYPE.LIVE_SHOW));
  };
}
