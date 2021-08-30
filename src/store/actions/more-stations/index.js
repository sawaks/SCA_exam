export const MORE_STATIONS_UPDATE = 'MORE_STATIONS_UPDATE';
export const ACTIVE_STATION_UPDATE = 'ACTIVE_STATION_UPDATE';
export const ACTIVE_STATION_ADD = 'ACTIVE_STATION_ADD';

export function updateMoreStations(stations) {
  return async (dispatch) => {
    dispatch({ type: MORE_STATIONS_UPDATE, stations });

    return stations;
  };
}

export function updateActiveStation(slug) {
  return async (dispatch) => {
    dispatch({ type: ACTIVE_STATION_UPDATE, slug });

    return slug;
  };
}

export function addActiveStation(station) {
  return async (dispatch) => {
    dispatch({ type: ACTIVE_STATION_ADD, station });

    return station;
  };
}
