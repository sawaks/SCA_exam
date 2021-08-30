import { DETECT_BROWSER, DETECT_PWA, DETECT_DEVICE, SETUP_DEVICE, SET_NOTIFICATION_PERMISSION } from 'store/actions/device';

const initialState = {
  browser: {},
  notificationPermStatus: false,
  pwa: false,
  deviceId: null,
};

export default function device(state = initialState, action) {
  switch (action.type) {
    case DETECT_BROWSER:
      return {
        ...state,
        browser: { ...action.browser },
      };
    case DETECT_PWA:
      return {
        ...state,
        pwa: action.isPWA,
      };
    case DETECT_DEVICE:
      return {
        ...state,
        deviceId: action.deviceId,
      };
    case SETUP_DEVICE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_NOTIFICATION_PERMISSION:
      return {
        ...state,
        notificationPermStatus: action.permission,
      };
    default:
      return state;
  }
}
