import { DETECT_BROWSER, DETECT_DEVICE } from 'store/actions/device';

const initialState = {
  browser: null,
  deviceId: null,
};

export default function device(state = initialState, action) {
  switch (action.type) {
    case DETECT_BROWSER:
      return {
        ...state,
        browser: action.browser,
      };
    case DETECT_DEVICE:
      return {
        ...state,
        deviceId: action.deviceId,
      };
    default:
      return state;
  }
}
