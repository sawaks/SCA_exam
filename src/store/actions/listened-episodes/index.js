import { updateListenedEpisodeSessionInfo } from 'store/actions/userSessionInfo';
import * as listenedEpisodes from 'utilities/api/firebase/listenedEpisodes';
import getISOStringWithoutMillisec from 'utilities/helpers/getISOStringWithoutMillisec';
import Logger from 'utilities/helpers/logger';

export const MY_PLAYLIST_FETCH_COMPLETE = 'MY_PLAYLIST_FETCH_COMPLETE';
export const MY_PLAYLIST_UPDATE_EPISODE = 'MY_PLAYLIST_UPDATE_EPISODE';
export const MY_PLAYLIST_REMOVE_EPISODE = 'MY_PLAYLIST_REMOVE_EPISODE';
export const ADD_OR_UPDATE_LISTENED_EPISODE_ERROR = 'ADD_OR_UPDATE_LISTENED_EPISODE_ERROR';

export function addOrUpdateEpisode(userId, {
  id,
  slug,
  season,
  durationSeconds,
  showId,
  showSlug,
  playheadPosition,
  isMarkedAsPlayed = false,
}) {
  return async (dispatch) => {
    try {
      const episode = {
        id,
        slug,
        season,
        durationSeconds,
        showId,
        showSlug,
        playheadPosition,
        progress: (playheadPosition <= 0) ? 0 : (playheadPosition / durationSeconds),
        playedDateTime: getISOStringWithoutMillisec(new Date()),
        isMarkedAsPlayed,
      };
      if (durationSeconds !== 0) {
        await listenedEpisodes.addOrUpdateEpisode(userId, episode);
        return dispatch(updateListenedEpisodeSessionInfo(episode));
      }
      return true;
    } catch (error) {
      dispatch({
        type: ADD_OR_UPDATE_LISTENED_EPISODE_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}
