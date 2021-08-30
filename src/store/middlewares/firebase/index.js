import { AUDIO_END, AUDIO_PAUSE, AUDIO_SEEKED, AUDIO_UPDATE_SOURCE } from 'store/actions/audio-player';
import { addOrUpdateEpisode } from 'store/actions/listened-episodes';
import isEmpty from 'lodash/isEmpty';
import sortOrderKeyToValue from 'utilities/helpers/switchSortOrderDefinitions';
import {
  ADD_NEW_SHOWS_SESSION_INFO,
  FETCH_PERSONALISED_INFORMATION,
  UPDATE_LISTENED_EPISODES_SESSION_INFO,
  editShowEpisodeInfo,
  editShowSortOrder,
  editPlaylistEpisodeInfo,
} from '../../actions/userSessionInfo';

const updateFirebaseMiddleware = store => next => (action) => {
  const { profile: { userId }, audioPlayer, episode } = store.getState();
  if (userId) {
    const triggersFirebaseUpdate = [AUDIO_END, AUDIO_UPDATE_SOURCE, AUDIO_SEEKED, AUDIO_PAUSE];
    if (triggersFirebaseUpdate.includes(action.type) && audioPlayer.sourceUrl !== '') {
      const { id, slug, season } = episode;
      const { id: showId, slug: showSlug } = episode.show;
      const { currentTime, duration } = audioPlayer;
      store.dispatch(addOrUpdateEpisode(userId, {
        id,
        slug,
        durationSeconds: duration,
        showId,
        showSlug,
        season,
        playheadPosition: currentTime || 0,
      }));
    }
  }
  next(action);
};
  // When the user logins ensure all loaded shows has the preferred sort order and previous listened information added.
const updatedSortOrderAndPersonalisedInfoOnShow = store => next => (action) => {
  if (action.type === FETCH_PERSONALISED_INFORMATION) {
    const { userSessionInfo: { shows } } = store.getState();
    const favShows = action.favouriteShows;
    const { listenedEpisodes } = action;

    // for (const id of Object.keys(favShows)) {
    Object.keys(favShows).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(shows, key)) {
        const item = favShows[key];
        const showId = item?.id;
        const favSortOrder = item?.episodeSortOrder;
        const showSlug = item?.slug;
        const getAPIFavSortOrder = favSortOrder && sortOrderKeyToValue(favSortOrder);
        const currentShowSortOrder = shows?.[key]?.sortOrder;

        if (getAPIFavSortOrder !== currentShowSortOrder) {
          if (getAPIFavSortOrder && showSlug && showId) {
            store.dispatch(editShowSortOrder(getAPIFavSortOrder, showSlug, showId, null, listenedEpisodes, favShows));
          }
        }
      }
    });
  }
  next(action);
};

// When the user logins ensure all loaded playlist has the previous listened information added.
const updatedPersonalisedInfoOnPlaylist = store => next => (action) => {
  if (action.type === FETCH_PERSONALISED_INFORMATION) {
    const favShows = action.favouriteShows;
    const { listenedEpisodes } = action;
    store.dispatch(editPlaylistEpisodeInfo(listenedEpisodes, favShows));
  }
  next(action);
};

// When the user visit a show page for the first time ensure the correct sort order and personalised info is applied.
const addSortOrderAndPersonalisedInfoOnShow = store => next => (action) => {
  if (action.type === ADD_NEW_SHOWS_SESSION_INFO) {
    const { userSessionInfo: { favouriteShows } } = store.getState();
    const sortOrderValue = action.sortOrder;
    const { showId } = action;
    const { showSlug } = action;
    const { lastSeason } = action;

    if (!isEmpty(favouriteShows) && Object.prototype.hasOwnProperty.call(favouriteShows, showId)) {
      const episodeSortOrder = favouriteShows?.[showId].episodeSortOrder;
      const convertSortOrderToValue = sortOrderKeyToValue(episodeSortOrder);
      if (convertSortOrderToValue && (convertSortOrderToValue !== sortOrderValue)) {
        store.dispatch(editShowSortOrder(convertSortOrderToValue, showSlug, showId, lastSeason));
      }
    }
  }
  next(action);
};

// Update show/playlist episodes when listened episode changes
const updateListeningStatusOnShowAndPlaylist = store => next => (action) => {
  const { profile: { userId }, userSessionInfo: { shows, playlists } } = store.getState();
  if (userId && action.type === UPDATE_LISTENED_EPISODES_SESSION_INFO) {
    const { id: episodeId, showId, season } = action.episode;

    const listenedEpisodes = {
      [episodeId]: { ...action.episode },
    };

    if (!isEmpty(shows)) {
      store.dispatch(editShowEpisodeInfo(showId, season, listenedEpisodes));
    }

    if (!isEmpty(playlists)) {
      store.dispatch(editPlaylistEpisodeInfo(listenedEpisodes));
    }
  }
  next(action);
};

// // Update show episodes when the users logins in.
// const updateShowEpisodeOnFirebaseFetch = store => next => (action) => {
//   if (action.type === FETCH_PERSONALISED_INFORMATION) {
//     store.dispatch(editAllShowsEpisodeInfo(action.listenedEpisodes, action.favouriteShows));
//   }
//   next(action);
// };

export {
  updateFirebaseMiddleware,
  updatedSortOrderAndPersonalisedInfoOnShow,
  addSortOrderAndPersonalisedInfoOnShow,
  updateListeningStatusOnShowAndPlaylist,
  updatedPersonalisedInfoOnPlaylist,
};
