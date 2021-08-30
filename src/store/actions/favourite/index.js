import { updateFavShowSessionInfo } from 'store/actions/userSessionInfo';
import * as favouriteApi from 'utilities/api/firebase/favourite';
import getISOStringWithoutMillisec from 'utilities/helpers/getISOStringWithoutMillisec';
import Logger from 'utilities/helpers/logger';
import { getOnboardFavStations } from '../../../utilities/api/graphql/stations/queryMethods';

export const DELETE_FAVOURITE_CATEGORY = 'DELETE_FAVOURITE_CATEGORY';
export const DELETE_FAVOURITE_CATEGORY_ERROR = 'DELETE_FAVOURITE_CATEGORY_ERROR';
export const ADD_FAVOURITE_CATEGORY = 'ADD_FAVOURITE_CATEGORY';
export const ADD_FAVOURITE_CATEGORY_ERROR = 'ADD_FAVOURITE_CATEGORY_ERROR';
export const DELETE_FAVOURITE_SHOW = 'DELETE_FAVOURITE_SHOW';
export const DELETE_FAVOURITE_SHOW_ERROR = 'DELETE_FAVOURITE_SHOW_ERROR';
export const ADD_FAVOURITE_SHOW = 'ADD_FAVOURITE_SHOW';
export const ADD_FAVOURITE_SHOW_ERROR = 'ADD_FAVOURITE_SHOW_ERROR';
export const UPDATE_FAVOURITE_SHOW = 'UPDATE_FAVOURITE_SHOW';
export const UPDATE_FAVOURITE_SHOW_ERROR = 'UPDATE_FAVOURITE_SHOW_ERROR';
export const ADD_FAVOURITE_GENRES = 'ADD_FAVOURITE_GENRES';
export const ADD_FAVOURITE_GENRES_ERROR = 'ADD_FAVOURITE_GENRES_ERROR';
export const DELETE_FAVOURITE_GENRE = 'DELETE_FAVOURITE_GENRE';
export const DELETE_FAVOURITE_GENRE_ERROR = 'DELETE_FAVOURITE_GENRE_ERROR';
export const ADD_FAVOURITE_GENRE = 'ADD_FAVOURITE_GENRE';
export const ADD_FAVOURITE_GENRE_ERROR = 'ADD_FAVOURITE_GENRE_ERROR';
export const ADD_FAVOURITE_STATIONS = 'ADD_FAVOURITE_STATIONS';
export const ADD_FAVOURITE_STATIONS_ERROR = 'ADD_FAVOURITE_STATIONS_ERROR';
export const UPDATE_FAVOURITE_STATION = 'UPDATE_FAVOURITE_STATION';
export const UPDATE_FAVOURITE_STATION_ERROR = 'UPDATE_FAVOURITE_STATION_ERROR';
export const ADD_FAVOURITE_STATION = 'ADD_FAVOURITE_STATION';
export const ADD_FAVOURITE_STATION_ERROR = 'ADD_FAVOURITE_STATION_ERROR';
export const DELETE_FAVOURITE_STATION = 'DELETE_FAVOURITE_STATION';
export const DELETE_FAVOURITE_STATION_ERROR = 'DELETE_FAVOURITE_STATION_ERROR';

export function addFavouriteCategory(userId, id, name, slug) {
  return async (dispatch) => {
    try {
      const category = {
        id,
        name,
        slug,
      };
      await favouriteApi.addFavouriteCategory(userId, category);

      dispatch({
        type: ADD_FAVOURITE_CATEGORY,
        category,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADD_FAVOURITE_CATEGORY_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function deleteFavouriteCategory(userId, id) {
  return async (dispatch) => {
    try {
      await favouriteApi.deleteFavouriteCategory(userId, id);

      dispatch({
        type: DELETE_FAVOURITE_CATEGORY,
        id,
      });
      return true;
    } catch (error) {
      dispatch({
        type: DELETE_FAVOURITE_CATEGORY_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addFavouriteShow(userId, id, name, slug, type, episodeSortOrder) {
  return async (dispatch) => {
    try {
      const show = {
        id,
        name,
        slug,
        showType: type,
        episodeSortOrder,
        lastSeen: getISOStringWithoutMillisec(new Date()),
      };
      await favouriteApi.addFavouriteShow(userId, show);

      dispatch({
        type: ADD_FAVOURITE_SHOW,
        show: {
          ...show,
          inFirebase: true,
        },
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADD_FAVOURITE_SHOW_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function updateFavouriteShow(userId, showId, episodeSortOrder) {
  return async (dispatch) => {
    try {
      const lastSeen = getISOStringWithoutMillisec(new Date());
      await favouriteApi.updateFavouriteShow(userId, showId, episodeSortOrder, lastSeen);

      dispatch(updateFavShowSessionInfo({
        id: showId,
        ...(episodeSortOrder && { episodeSortOrder }),
        lastSeen,
      }));
      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_FAVOURITE_SHOW_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function deleteFavouriteShow(userId, id) {
  return async (dispatch) => {
    try {
      await favouriteApi.deleteFavouriteShow(userId, id);

      dispatch({
        type: DELETE_FAVOURITE_SHOW,
        id,
      });
      return true;
    } catch (error) {
      dispatch({
        type: DELETE_FAVOURITE_SHOW_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addFavouriteGenres(userId, genres) {
  return async (dispatch) => {
    try {
      await favouriteApi.setFavouriteGenres(userId, genres);

      dispatch({
        type: ADD_FAVOURITE_GENRES,
        genres,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADD_FAVOURITE_GENRES_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addFavouriteGenre(userId, name, slug, description) {
  return async (dispatch) => {
    try {
      const genre = {
        name,
        slug,
        description,
      };
      await favouriteApi.addFavouriteGenre(userId, genre);

      dispatch({
        type: ADD_FAVOURITE_GENRE,
        genre,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADD_FAVOURITE_GENRE_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function deleteFavouriteGenre(userId, slug) {
  return async (dispatch) => {
    try {
      await favouriteApi.deleteFavouriteGenre(userId, slug);

      dispatch({
        type: DELETE_FAVOURITE_GENRE,
        slug,
      });
      return true;
    } catch (error) {
      dispatch({
        type: DELETE_FAVOURITE_GENRE_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addFavouriteStations(userId, postcode, selectedStationsSlugs) {
  return async (dispatch) => {
    try {
      const favouriteStations = await getOnboardFavStations(postcode, selectedStationsSlugs);
      await favouriteApi.setFavouriteStations(userId, favouriteStations);

      const payload = favouriteStations.reduce((acc, item) => {
        acc[`${item.slug}`] = { ...item };
        return acc;
      }, {});

      dispatch({
        type: ADD_FAVOURITE_STATIONS,
        payload,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADD_FAVOURITE_STATIONS_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addFavouriteStation(userId, station) {
  return async (dispatch) => {
    try {
      const lastSeen = getISOStringWithoutMillisec(new Date());
      const createDate = getISOStringWithoutMillisec(new Date());
      const completeStation = { ...station, lastSeen, createDate };

      await favouriteApi.addFavouriteStation(userId, completeStation);

      dispatch({
        type: ADD_FAVOURITE_STATION,
        station: completeStation,
      });
    } catch (error) {
      dispatch({
        type: ADD_FAVOURITE_STATION_ERROR,
        station,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function deleteFavouriteStation(userId, stationId) {
  return async (dispatch) => {
    try {
      await favouriteApi.deleteFavouriteStation(userId, stationId);

      dispatch({
        type: DELETE_FAVOURITE_STATION,
        slug: stationId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_FAVOURITE_STATION_ERROR,
        slug: stationId,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function updateFavouriteStation(userId, stationId) {
  return async (dispatch) => {
    try {
      const lastSeen = getISOStringWithoutMillisec(new Date());
      await favouriteApi.updateFavouriteStation(userId, stationId, lastSeen);

      dispatch({
        type: UPDATE_FAVOURITE_STATION,
        stationId,
        lastSeen,
      });
      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_FAVOURITE_STATION_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}
