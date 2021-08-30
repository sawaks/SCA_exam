import * as feedApi from 'utilities/api/firebase/feed';

export const MY_FEED_FETCH_COMPLETE = 'MY_FEED_FETCH_COMPLETE';
export const MY_FEED_GENERATION_COMPLETE = 'MY_FEED_GENERATION_COMPLETE';
export const MY_FEED_GENERATION_ERROR = 'MY_FEED_GENERATION_ERROR';
export const STATIONS_FEED_FETCH_COMPLETE = 'STATIONS_FEED_FETCH_COMPLETE';
export const STATION_FEED_GENERATION_COMPLETE = 'STATION_FEED_GENERATION_COMPLETE';
export const STATION_FEED_GENERATION_ERROR = 'STATION_FEED_GENERATION_ERROR';

export function fetchMyFeed() {
  return async (dispatch, getState) => {
    const { profile: { userId } } = getState();
    const feedSnapshot = await feedApi.readMyFeed(userId);
    const feed = feedSnapshot.data();
    dispatch({
      type: MY_FEED_FETCH_COMPLETE,
      feed,
    });

    const top = feed?.top || null;
    const bottom = feed?.bottom || null;

    return [top, bottom];
  };
}

export function generateMyFeed(userId, favouriteCategories, favouriteShows) {
  return async (dispatch) => {
    try {
      await feedApi.generateMyFeed(userId, favouriteCategories, favouriteShows);
    } catch (error) {
      dispatch({
        type: MY_FEED_GENERATION_ERROR,
        error,
      });
    }

    dispatch({
      type: MY_FEED_GENERATION_COMPLETE,
    });
  };
}

export function fetchStationsFeed() {
  return async (dispatch, getState) => {
    const { profile: { userId } } = getState();
    const feedSnapshot = await feedApi.readStationsFeed(userId);
    const stationsFeed = feedSnapshot.data();
    dispatch({
      type: STATIONS_FEED_FETCH_COMPLETE,
      stationsFeed,
    });

    const top = stationsFeed?.top?.entries || null;
    const bottom = stationsFeed?.bottom?.entries || null;

    return [top, bottom];
  };
}

export function generateStationsFeed(userId, favouriteGenres, favouriteStations) {
  return async (dispatch) => {
    try {
      const genreSlugs = favouriteGenres.map(genre => genre.slug);
      const stationSlugs = favouriteStations.map(station => station.slug);
      await feedApi.generateStationsFeed(userId, genreSlugs, stationSlugs);
    } catch (error) {
      dispatch({
        type: STATION_FEED_GENERATION_ERROR,
        error,
      });
    }

    dispatch({
      type: STATION_FEED_GENERATION_COMPLETE,
    });
  };
}
