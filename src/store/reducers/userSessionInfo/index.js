import {
  ADD_FAVOURITE_CATEGORY,
  ADD_FAVOURITE_SHOW,
  DELETE_FAVOURITE_CATEGORY,
  DELETE_FAVOURITE_SHOW,
  ADD_FAVOURITE_GENRES,
  ADD_FAVOURITE_GENRE,
  DELETE_FAVOURITE_GENRE,
  ADD_FAVOURITE_STATIONS,
  UPDATE_FAVOURITE_STATION,
  ADD_FAVOURITE_STATION,
  DELETE_FAVOURITE_STATION,
} from 'store/actions/favourite';
import { PROFILE_SIGNOUT_SUCCESS } from 'store/actions/profile';
import {
  UPDATE_LISTENED_EPISODES_SESSION_INFO,
  UPDATE_FAV_SHOW_SESSION_INFO,
  UPDATE_SEASON_SHOW_SESSION_INFO,
  ADD_NEW_SHOWS_SESSION_INFO,
  UPDATE_SHOW_ORDER_SHOW_SESSION_INFO,
  CHANGE_SHOW_ORDER,
  EDIT_SHOW_EPISODE_SESSION_INFO,
  FETCH_PERSONALISED_INFORMATION,
  ADD_NEW_PLAYLIST_SESSION_INFO,
  EDIT_PLAYLIST_EPISODE_SESSION_INFO,
  DELETE_LISTENED_EPISODE,
} from 'store/actions/userSessionInfo';

const initialState = {
  favouriteShows: {},
  favouriteCategories: [],
  favouriteStations: {},
  listenedEpisodes: {},
  shows: {},
  playlists: {},
  favouriteGenres: [],
};

export default function podcastStats(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LISTENED_EPISODES_SESSION_INFO: {
      const listenedEpisodes = { ...state.listenedEpisodes };
      listenedEpisodes[action.episode.id] = {
        ...listenedEpisodes[action.episode.id],
        ...action.episode,
      };
      return {
        ...state,
        listenedEpisodes,
      };
    }
    case DELETE_LISTENED_EPISODE: {
      const newListenedEpisodes = Object.assign({}, state.listenedEpisodes);
      const episodeId = action.episode;
      delete newListenedEpisodes[episodeId];
      return {
        ...state,
        listenedEpisodes: newListenedEpisodes,
      };
    }
    case ADD_FAVOURITE_CATEGORY: {
      const newCategory = {
        ...state.favouriteCategories[action.category.id],
        ...action.category,
      };
      return {
        ...state,
        favouriteCategories: [...state.favouriteCategories, newCategory],
      };
    }
    case DELETE_FAVOURITE_CATEGORY: {
      const favCategories = [...state.favouriteCategories];
      return {
        ...state,
        favouriteCategories: favCategories.filter(item => item.id !== action.id),
      };
    }
    case DELETE_FAVOURITE_SHOW: {
      const favShows = { ...state.favouriteShows };
      delete favShows[action.id];
      return {
        ...state,
        favouriteShows: favShows,
      };
    }
    case ADD_FAVOURITE_SHOW:
    case UPDATE_FAV_SHOW_SESSION_INFO: {
      return {
        ...state,
        favouriteShows: {
          ...state.favouriteShows,
          [action.show.id]: {
            ...state.favouriteShows[action.show.id],
            ...action.show,
          },
        },
      };
    }
    case ADD_FAVOURITE_GENRES: {
      return {
        ...state,
        favouriteGenres: action.genres,
        hasUserOnboardedMusic: true,
      };
    }
    case ADD_FAVOURITE_GENRE: {
      return {
        ...state,
        favouriteGenres: [...state.favouriteGenres, action.genre],
      };
    }
    case DELETE_FAVOURITE_GENRE: {
      const favGenres = [...state.favouriteGenres];
      return {
        ...state,
        favouriteGenres: favGenres.filter(item => item.slug !== action.slug),
      };
    }
    case ADD_FAVOURITE_STATIONS: {
      return {
        ...state,
        favouriteStations: { ...state.favouriteStations, ...action.payload },
      };
    }
    case ADD_FAVOURITE_STATION: {
      return {
        ...state,
        favouriteStations: {
          ...state.favouriteStations,
          [action.station.slug]: { ...action.station },
        },
      };
    }
    case DELETE_FAVOURITE_STATION: {
      const favStations = { ...state.favouriteStations };
      delete favStations[action.slug];
      return {
        ...state,
        favouriteStations: favStations,
      };
    }
    case UPDATE_FAVOURITE_STATION: {
      return {
        ...state,
        favouriteStations: {
          ...state.favouriteStations,
          [action.stationId]: {
            ...state[action.stationId],
            lastSeen: action.lastSeen,
          },
        },
      };
    }
    case FETCH_PERSONALISED_INFORMATION: {
      const cleanFavouriteShows = !action.favouriteShows.length ? action.favouriteShows : { ...action.favouriteShows };
      return {
        ...state,
        favouriteCategories: [...action.favouriteCategories],
        favouriteShows: cleanFavouriteShows,
        listenedEpisodes: {
          ...state.episodes,
          ...action?.listenedEpisodes,
        },
        favouriteGenres: [...action.favouriteGenres],
        favouriteStations: { ...state.favouriteStations, ...action.favouriteStations },
      };
    }
    case PROFILE_SIGNOUT_SUCCESS:
      return {
        ...initialState,
        podcasts: {},
        episodes: {},
      };

    case ADD_NEW_SHOWS_SESSION_INFO:
    case CHANGE_SHOW_ORDER: {
      return {
        ...state,
        shows: {
          ...state.shows,
          [action.showId]: {
            sortOrder: action.sortOrder,
            loadedSeasons: action.loadedSeasons,
            availableSeasons: action.availableSeasons,
            firstSeason: action.firstSeason,
            lastSeason: action.lastSeason,
            seasons: action.seasons,
            playerBgImage: action.playerBgImage,
          },
        },
      };
    }
    case UPDATE_SEASON_SHOW_SESSION_INFO: {
      return {
        ...state,
        shows: {
          ...state.shows,
          [action.showId]: {
            ...state.shows[action.showId],
            loadedSeasons: action.loadedSeasons,
            seasons: [
              ...action.addNewSeason,
            ],
          },
        },
      };
    }
    case UPDATE_SHOW_ORDER_SHOW_SESSION_INFO: {
      return {
        ...state,
        shows: {
          ...state.shows,
          [action.showId]: {
            ...state.shows[action.showId],
            loadedSeasons: action.loadedSeasons,
            seasons: [
              ...action.addNewSeason,
            ],
          },
        },
      };
    }
    case EDIT_SHOW_EPISODE_SESSION_INFO: {
      return {
        ...state,
        shows: {
          ...state.shows,
          [action.showId]: {
            ...state.shows[action.showId],
            seasons: action.newSeasonsInfo,
          },
        },
      };
    }
    case ADD_NEW_PLAYLIST_SESSION_INFO: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          [action.playlistSlug]: {
            playlistName: action.playlistName,
            episodes: action.episodes,
          },
        },
      };
    }
    case EDIT_PLAYLIST_EPISODE_SESSION_INFO: {
      return {
        ...state,
        playlists: {
          ...action.playlists,
        },
      };
    }
    default:
      return state;
  }
}
