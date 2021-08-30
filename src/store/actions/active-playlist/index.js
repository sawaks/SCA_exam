import Logger from 'utilities/helpers/logger';
import { EPISODE_ORIGIN } from 'utilities/constants';
import { updateCurrentEpisode } from '../episode';
import { addSeasonToShowSessionInfo } from '../userSessionInfo';

export const TOGGLE_AUTO_PLAY = 'TOGGLE_AUTO_PLAY';
export const UPDATE_ACTIVE_PLAYLIST_SESSION_INFO = 'UPDATE_ACTIVE_PLAYLIST_SESSION_INFO';
export const UPDATE_ACTIVE_PLAYLIST_SESSION_ERROR = 'UPDATE_ACTIVE_PLAYLIST_SESSION_ERROR';

export const toggleAutoPlay = () => ({
  type: TOGGLE_AUTO_PLAY,
});

export function updateActivePlaylist(ids) {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ACTIVE_PLAYLIST_SESSION_INFO,
        ids,
      });
      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_ACTIVE_PLAYLIST_SESSION_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function handleNextEpisode(listenedEpisodes = {}) {
  return async (dispatch, getState) => {
    const { episode, activePlaylist: { episodesList } } = getState();
    const currentId = episode?.id;
    const { nextSeason } = episode;
    const showId = episode?.show?.id;
    const showSlug = episode?.show?.slug;
    const index = episodesList.findIndex(indx => indx === currentId);
    // Check if its the last episode
    if (index < episodesList.length - 1) {
      const nextEpisodeId = episodesList[index + 1];
      const listenedEpisodesArray = Object.keys(listenedEpisodes).map(i => listenedEpisodes[i]);
      const listenedEpisode = listenedEpisodesArray.filter(item => item.id === nextEpisodeId);
      const playedEpisodeHeadPosition = listenedEpisode[0]?.playheadPosition || 0;
      // Updates the current episode. The player overlay will detect the source change and trigger play
      await dispatch(updateCurrentEpisode(nextEpisodeId, playedEpisodeHeadPosition, episode.playlistSlug, episode.origin));
      return true;
    }
    // fetch next season is available
    if (nextSeason && index === episodesList.length - 1 && episode.origin === EPISODE_ORIGIN.default) {
      // If its the last episode, fetch the next episodes from the server.
      const newSeasonEpisodes = await dispatch(addSeasonToShowSessionInfo(showId, showSlug, nextSeason));
      const firstEpisodeId = newSeasonEpisodes?.[0]?.id;
      if (firstEpisodeId) {
        const listenedEpisodesArray = Object.keys(listenedEpisodes).map(i => listenedEpisodes[i]);
        const listenedEpisode = listenedEpisodesArray.filter(item => item.id === firstEpisodeId);
        const playedEpisodeHeadPosition = listenedEpisode[0]?.playheadPosition || 0;
        await dispatch(updateCurrentEpisode(firstEpisodeId, playedEpisodeHeadPosition, episode.playlistSlug, episode.origin));
        return true;
      }
      return false;
    }
    return false;
  };
}

export function handlePreviousEpisode(listenedEpisodes = {}) {
  return async (dispatch, getState) => {
    const { episode, activePlaylist: { episodesList } } = getState();
    const currentId = episode.id;
    const index = episodesList.findIndex(indx => indx === currentId);
    // Make sure its not the first episode
    if (index !== 0) {
      const previousEpisodeId = episodesList[index - 1];
      const listenedEpisodesArray = Object.keys(listenedEpisodes).map(i => listenedEpisodes[i]);
      const listenedEpisode = listenedEpisodesArray.filter(item => item.id === previousEpisodeId);
      const playedEpisodeHeadPosition = listenedEpisode[0]?.playheadPosition || 0;
      // Updates the current episode. The player overlay will detect the source change and trigger play
      await dispatch(updateCurrentEpisode(previousEpisodeId, playedEpisodeHeadPosition, episode.playlistSlug, episode.origin));
      return true;
    }
    return false;
  };
}
