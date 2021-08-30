import { MY_FEED_FETCH_COMPLETE, STATIONS_FEED_FETCH_COMPLETE } from 'store/actions/my-feed';

const initialState = {
  podcasts: {
    top: {},
    bottom: {},
  },
  stations: {
    top: {},
    bottom: {},
  },
};

export default function myFeedReducer(state = initialState, action) {
  switch (action.type) {
    case MY_FEED_FETCH_COMPLETE: {
      return {
        ...state,
        podcasts: { ...action.feed },
      };
    }
    case STATIONS_FEED_FETCH_COMPLETE: {
      return {
        ...state,
        stations: { ...action.stationsFeed },
      };
    }
    default:
      return state;
  }
}
