import * as liveStreamPlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import sha256 from 'js-sha256';
import { getStationBySlug } from 'utilities/api/graphql/stations/queryMethods';

export const STATION_UPDATE = 'STATION_UPDATE';

export function updateStation(stationSlug) {
  return async (dispatch, getState) => {
    const { profile } = getState();
    const { station } = await getStationBySlug(stationSlug);
    liveStreamPlayer.updateSource(station?.audioStreams[0]?.url, sha256(profile?.email));

    dispatch({ type: STATION_UPDATE, station });
    return station;
  };
}
