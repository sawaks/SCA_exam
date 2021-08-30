export const DETECT_BROWSER = 'DETECT_BROWSER';
export const DETECT_PWA = 'IS_PWA';
export const DETECT_DEVICE = 'DETECT_DEVICE';
export const SETUP_DEVICE = 'SETUP_DEVICE';
export const SET_NOTIFICATION_PERMISSION = 'SET_NOTIFICATION_PERMISSION';

export const detectBrowser = browser => ({
  type: DETECT_BROWSER,
  browser,
});

export const detectPWA = isPWA => ({
  type: DETECT_PWA,
  isPWA,
});

export const detectDevice = deviceId => ({
  type: DETECT_DEVICE,
  deviceId,
});

export const setNotificationPermission = permission => ({
  type: SET_NOTIFICATION_PERMISSION,
  permission,
});

export const initiateDeviceSettings = payload => ({
  type: SETUP_DEVICE,
  payload,
});
