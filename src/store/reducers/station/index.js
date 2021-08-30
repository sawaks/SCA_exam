import { STATION_UPDATE } from 'store/actions/station';

const initialState = {
  name: '',
  slug: '',
  stationCode: '',
  stationType: '',
  relatedStations: [],
};

export default function stationReducer(state = initialState, action) {
  switch (action.type) {
    case STATION_UPDATE: {
      const newStation = { ...action.station };
      delete newStation.relatedStations;

      return newStation;
    }

    default:
      return state;
  }
}
