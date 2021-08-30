import Logger from 'utilities/helpers/logger';
import get from 'lodash/get';
import { EPISODES_SORT_ORDER, EPISODES_SORT_TYPE } from 'utilities/constants';
import { getEpisodesBySeasonsAndOrder } from 'utilities/api/graphql/episodes/queryMethods';
import { convertDate } from 'utilities/helpers/dateTime';
import episodeComplete from 'utilities/helpers/episodeComplete';
import moment from 'moment';

export const UPDATE_LISTENED_EPISODES_SESSION_INFO = 'UPDATE_LISTENED_EPISODES_SESSION_INFO';
export const UPDATE_LISTENED_EPISODES_SESSION_INFO_ERROR = 'UPDATE_LISTENED_EPISODES_SESSION_INFO_ERROR';
export const UPDATE_FAV_SHOW_SESSION_INFO = 'UPDATE_FAV_SHOW_SESSION_INFO';
export const ADD_NEW_SHOWS_SESSION_INFO = 'ADD_NEW_SHOWS_SESSION_INFO';
export const ADD_NEW_SHOWS_SESSION_INFO_ERROR = 'ADD_NEW_SHOWS_SESSION_INFO_ERROR';
export const ADD_NEW_PLAYLIST_SESSION_INFO = 'ADD_NEW_PLAYLIST_SESSION_INFO';
export const ADD_NEW_PLAYLIST_SESSION_INFO_ERROR = 'ADD_NEW_PLAYLIST_SESSION_INFO_ERROR';
export const UPDATE_SEASON_SHOW_SESSION_INFO = 'UPDATE_SEASON_SHOW_SESSION_INFO';
export const UPDATE_SEASON_SHOW_SESSION_INFO_ERROR = 'UPDATE_SEASON_SHOW_SESSION_INFO_ERROR';
export const UPDATE_SHOW_ORDER_SHOW_SESSION_INFO = 'UPDATE_SHOW_ORDER_SHOW_SESSION_INFO';
export const UPDATE_SHOW_ORDER_SHOW_SESSION_INFO_ERROR = 'UPDATE_SHOW_ORDER_SHOW_SESSION_INFO_ERROR';
export const CHANGE_SHOW_ORDER = 'CHANGE_SHOW_ORDER';
export const CHANGE_SHOW_ORDER_ERROR = 'CHANGE_SHOW_ORDER_ERROR';
export const EDIT_SHOW_EPISODE_SESSION_INFO = 'EDIT_SHOW_EPISODE_SESSION_INFO';
export const EDIT_SHOW_EPISODE_SESSION_INFO_ERROR = 'EDIT_SHOW_EPISODE_SESSION_INFO_ERROR';
export const EDIT_PLAYLIST_EPISODE_SESSION_INFO = 'EDIT_PLAYLIST_EPISODE_SESSION_INFO';
export const EDIT_PLAYLIST_EPISODE_SESSION_INFO_ERROR = 'EDIT_PLAYLIST_EPISODE_SESSION_INFO_ERROR';
export const EDIT_ALL_SHOW_EPISODE_SESSION_INFO = 'EDIT_ALL_SHOW_EPISODE_SESSION_INFO';
export const EDIT_ALL_SHOW_EPISODE_SESSION_INFO_ERROR = 'EDIT_ALL_SHOW_EPISODE_SESSION_INFO_ERROR';
export const FETCH_PERSONALISED_INFORMATION = 'FETCH_PERSONALISED_INFORMATION';
export const FETCH_PERSONALISED_INFORMATION_ERROR = 'FETCH_PERSONALISED_INFORMATION_ERROR';
export const DELETE_LISTENED_EPISODE = 'DELETE_LISTENED_EPISODE';
export const DELETE_LISTENED_EPISODE_ERROR = 'DELETE_LISTENED_EPISODE_ERROR';

const combineWithPersonalisedData = (episodes, PersonalisedEpisodeData, PersonalisedFavData) => {
  episodes.forEach((element, index) => {
    const saveFavShow = PersonalisedFavData?.[element?.show?.id];

    if (PersonalisedEpisodeData[element.id]) {
      const saveEpisodeData = PersonalisedEpisodeData?.[element.id];
      episodes[index] = {
        ...element,
        ...saveEpisodeData,
        info: saveEpisodeData.episode && `Ep ${saveEpisodeData.episode}`,
        publishedDate: convertDate(saveEpisodeData.publishedUtc),
        time: saveEpisodeData.playheadPosition || 0,
        isCompleted: saveEpisodeData.isMarkedAsPlayed || episodeComplete(saveEpisodeData.playheadPosition, saveEpisodeData.durationSeconds),
      };
    } else {
      episodes[index] = {
        ...element,
        isNewEpisode: saveFavShow?.lastSeen ? moment(element.publishedUtc).isAfter(saveFavShow.lastSeen) : null,
      };
    }
  });
};

export function updateFavShowSessionInfo(show) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FAV_SHOW_SESSION_INFO,
      show,
    });
    return true;
  };
}

export function updateListenedEpisodeSessionInfo(episode) {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_LISTENED_EPISODES_SESSION_INFO,
        episode,
      });
      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_LISTENED_EPISODES_SESSION_INFO_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addPersonalisedInformationToStore(favouriteShows, favouriteCategories, listenedEpisodes = {}, favouriteGenres, favouriteStations = null) {
  const favouriteShowsObject = favouriteShows.reduce((acc, item) => {
    acc[item.id] = { ...item, inFirebase: true };
    return acc;
  }, {});

  let favouriteStationsObject = null;
  if (favouriteStations) {
    favouriteStationsObject = favouriteStations.reduce((acc, item) => {
      acc[`${item.slug}`] = { ...item };
      return acc;
    }, {});
  }

  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PERSONALISED_INFORMATION,
        favouriteShows: favouriteShowsObject,

        favouriteCategories,
        ...(listenedEpisodes && { listenedEpisodes }),
        favouriteGenres,
        ...(favouriteStationsObject && { favouriteStations: favouriteStationsObject }),
      });
      return true;
    } catch (error) {
      dispatch({
        type: FETCH_PERSONALISED_INFORMATION_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addNewShowSessionInfo({ showId, showSlug, seasons, showType, playerBgImage }) {
  const defaultSortOrder = showType === EPISODES_SORT_TYPE.SERIAL ? EPISODES_SORT_ORDER.ASC : EPISODES_SORT_ORDER.DESC;
  const firstSeason = seasons?.[0]?.season;
  const lastSeason = seasons?.[seasons.length - 1]?.season;

  const loadedSeasons = seasons.map(item => item.episodes && item.season).filter(item => item);
  const availableSeasons = seasons.map(item => item.season);

  return async (dispatch, getState) => {
    const state = getState();
    const listenedEpisodes = state?.userSessionInfo?.listenedEpisodes;
    const favouriteShows = state?.userSessionInfo?.favouriteShows;

    if (listenedEpisodes) {
      seasons = seasons.map((item) => {
        if (item.episodes) {
          combineWithPersonalisedData(item.episodes, listenedEpisodes, favouriteShows);
        }
        return item;
      });
    }

    try {
      dispatch({
        type: ADD_NEW_SHOWS_SESSION_INFO,
        loadedSeasons,
        availableSeasons,
        firstSeason,
        lastSeason,
        showId,
        showSlug,
        seasons,
        playerBgImage,
        sortOrder: defaultSortOrder,
      });
    } catch (error) {
      dispatch({
        type: ADD_NEW_SHOWS_SESSION_INFO_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addNewPlaylistSessionInfo({ playlistSlug, playlistName, episodes }) {
  return async (dispatch, getState) => {
    const state = getState();
    const listenedEpisodes = state?.userSessionInfo?.listenedEpisodes;
    const favouriteShows = state?.userSessionInfo?.favouriteShows;

    if (episodes) {
      combineWithPersonalisedData(episodes, listenedEpisodes, favouriteShows);
    }

    try {
      dispatch({
        type: ADD_NEW_PLAYLIST_SESSION_INFO,
        playlistSlug,
        playlistName,
        episodes,
      });
    } catch (error) {
      dispatch({
        type: ADD_NEW_PLAYLIST_SESSION_INFO_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function editShowEpisodeInfo(showId, season, listenedEpisodes = null, favouriteShows = null) {
  return async (dispatch, getState) => {
    const state = getState();
    const seasons = state?.userSessionInfo?.shows?.[showId]?.seasons;

    if (seasons) {
      const getFavouriteShows = favouriteShows || state?.userSessionInfo?.favouriteShows;
      const getListenedEpisodes = listenedEpisodes || state?.userSessionInfo?.listenedEpisodes;
      const seasonCheck = season || 0;
      const newSeasonsInfo = seasons.map((item) => {
        if ((item.season === seasonCheck) && item.episodes) {
          combineWithPersonalisedData(item.episodes, getListenedEpisodes, getFavouriteShows);
        }
        return item;
      });
      try {
        dispatch({
          type: EDIT_SHOW_EPISODE_SESSION_INFO,
          showId,
          newSeasonsInfo,
        });
      } catch (error) {
        dispatch({
          type: EDIT_SHOW_EPISODE_SESSION_INFO_ERROR,
          error,
        });
        Logger.error(error);
        throw error;
      }
    }
  };
}

export function editPlaylistEpisodeInfo(listenedEpisodes = null, favouriteShows = null) {
  return async (dispatch, getState) => {
    const state = getState();
    const playlists = state?.userSessionInfo?.playlists;

    if (playlists) {
      const getFavouriteShows = favouriteShows || state?.userSessionInfo?.favouriteShows;
      const getListenedEpisodes = listenedEpisodes || state?.userSessionInfo?.listenedEpisodes;

      Object.keys(playlists).forEach((key) => {
        const episodes = playlists[key]?.episodes;
        if (episodes) {
          combineWithPersonalisedData(episodes, getListenedEpisodes, getFavouriteShows);
        }
      });
      try {
        dispatch({
          type: EDIT_PLAYLIST_EPISODE_SESSION_INFO,
          playlists,
        });
      } catch (error) {
        dispatch({
          type: EDIT_PLAYLIST_EPISODE_SESSION_INFO_ERROR,
          error,
        });
        Logger.error(error);
        throw error;
      }
    }
  };
}

export function editAllShowsEpisodeInfo(listenedEpisodes, favouriteShows) {
  return async (dispatch, getState) => {
    const state = getState();
    const shows = state?.userSessionInfo?.shows;

    Object.keys(shows).forEach((key) => {
      shows[key].seasons = shows[key].seasons.map((item) => {
        if (item.episodes) {
          combineWithPersonalisedData(item.episodes, listenedEpisodes, favouriteShows);
        }
        return item;
      });
    });
    try {
      dispatch({
        type: EDIT_ALL_SHOW_EPISODE_SESSION_INFO,
        shows,
      });
    } catch (error) {
      dispatch({
        type: EDIT_ALL_SHOW_EPISODE_SESSION_INFO_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function editShowSortOrder(order, showSlug, showId, lastSeason = null, listenedEpisodes = null, favShows = null) {
  return async (dispatch, getState) => {
    const { userSessionInfo } = getState();
    const getfavouriteShows = favShows || userSessionInfo?.favouriteShows;
    const getlastSeason = lastSeason || userSessionInfo?.shows?.[showId]?.lastSeason;
    const getlistenedEpisodes = listenedEpisodes || userSessionInfo?.listenedEpisodes;

    try {
      const showContents = get(await getEpisodesBySeasonsAndOrder(showSlug, getlastSeason, order), 'show', null);
      const firstSeason = showContents?.seasons?.[0]?.season;
      const episodes = showContents?.episodes?.items;
      const seasons = showContents?.seasons;
      const availableSeasons = seasons.map(item => item.season);
      const newLastSeason = seasons?.[seasons.length - 1]?.season;

      if (getlistenedEpisodes) {
        combineWithPersonalisedData(episodes, getlistenedEpisodes, getfavouriteShows);
      }

      const modifiedSeasons = seasons.map((item) => {
        if (item.season === firstSeason) {
          return { ...item, episodes };
        }
        return item;
      });

      const loadedSeasons = modifiedSeasons.map(item => item.episodes && item.season).filter(item => item);

      dispatch({
        type: CHANGE_SHOW_ORDER,
        loadedSeasons,
        availableSeasons,
        firstSeason,
        lastSeason: newLastSeason,
        showId,
        seasons: modifiedSeasons,
        sortOrder: order,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_SHOW_ORDER_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addSeasonToShowSessionInfo(showId, showSlug, season) {
  return async (dispatch, getState) => {
    const { userSessionInfo } = getState();
    const currentSortOrder = userSessionInfo?.shows?.[showId]?.sortOrder;
    const currentSeason = userSessionInfo?.shows?.[showId]?.seasons;
    // check if the season's episodes already exists. If so then just exit.
    const checkIfEpisodesExists = currentSeason.find(item => item.season === season)?.episodes;
    if (checkIfEpisodesExists) return;

    const listenedEpisodes = userSessionInfo?.listenedEpisodes;
    const favouriteShows = userSessionInfo?.favouriteShows;
    try {
      const results = get(await getEpisodesBySeasonsAndOrder(showSlug, season, currentSortOrder), 'show.episodes.items', null);

      if (listenedEpisodes && results) combineWithPersonalisedData(results, listenedEpisodes, favouriteShows);

      if (currentSeason) {
        const addNewSeason = currentSeason.map((item) => {
          if (item.season === season) {
            return {
              ...item,
              ...(results && { episodes: results }),
            };
          }
          return item;
        });

        const loadedSeasons = addNewSeason.map(item => item.episodes && item.season).filter(item => item);
        dispatch({
          type: UPDATE_SEASON_SHOW_SESSION_INFO,
          showId,
          loadedSeasons,
          addNewSeason,
        });
      }
      // eslint-disable-next-line consistent-return
      return results;
    } catch (error) {
      dispatch({
        type: UPDATE_SEASON_SHOW_SESSION_INFO_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function deleteUserEpisode(episode) {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_LISTENED_EPISODE,
        episode,
      });
      return true;
    } catch (error) {
      dispatch({
        type: DELETE_LISTENED_EPISODE_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}
