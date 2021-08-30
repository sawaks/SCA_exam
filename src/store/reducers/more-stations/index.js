import { ACTIVE_STATION_ADD, ACTIVE_STATION_UPDATE, MORE_STATIONS_UPDATE } from 'store/actions/more-stations';

const initialState = [];

export default function moreStationsReducer(state = initialState, action) {
  switch (action.type) {
    case MORE_STATIONS_UPDATE: {
      return [
        ...action.stations,
      ];
    }
    case ACTIVE_STATION_ADD: {
      const activeStation = { ...action.station };
      activeStation.active = true;
      delete activeStation.relatedStations;

      return [activeStation, ...state];
    }
    case ACTIVE_STATION_UPDATE: {
      return [...state].map((item) => {
        if (item.slug === action.slug) {
          return {
            ...item,
            active: true,
          };
        }
        return {
          ...item,
          active: false,
        };
      });
    }

    default:
      return state;
  }
}
