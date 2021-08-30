import { getStationBySlug } from 'utilities/api/graphql/stations/queryMethods';

export const STATION_UPDATE = 'STATION_UPDATE';

export function updateStation(stationSlug) {
  return async (dispatch) => {
    const { station } = await getStationBySlug(stationSlug);

    dispatch({ type: STATION_UPDATE, station });
    return station;
  };
}
