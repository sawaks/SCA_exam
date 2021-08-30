export const DISPLAY_SIGNUP_MODAL = 'DISPLAY_SIGNUP_MODAL';
export const CLOSE_SIGNUP_MODAL = 'CLOSE_SIGNUP_MODAL';
export const DISPLAY_NEWSLETTER_MODAL = 'DISPLAY_NEWSLETTER_MODAL';
export const CLOSE_NEWSLETTER_MODAL = 'CLOSE_NEWSLETTER_MODAL';
export const DISPLAY_COLLECTION_MODAL = 'DISPLAY_COLLECTION_MODAL';
export const CLOSE_COLLECTION_MODAL = 'CLOSE_COLLECTION_MODAL';
export const DISPLAY_NOTIFICATIONS_MODAL = 'DISPLAY_NOTIFICATIONS_MODAL';
export const CLOSE_NOTIFICATIONS_MODAL = 'CLOSE_NOTIFICATIONS_MODAL';
export const MARK_AS_PLAYED = 'MARK_AS_PLAYED';
export const REFRESH_EPISODE_LIST_COMPLETED = 'REFRESH_EPISODE_LIST_COMPLETED';
export const COMMENTS_SHOW_REPORT_MODAL = 'COMMENTS_SHOW_REPORT_MODAL';
export const COMMENTS_HIDE_REPORT_MODAL = 'COMMENTS_HIDE_REPORT_MODAL';
export const NOTIFICATION_PERMISSION_REQUESTED = 'NOTIFICATION_PERMISSION_REQUESTED';
export const NOTIFICATION_PERMISSION_REJECTED = 'NOTIFICATION_PERMISSION_REJECTED';
export const PLAYER_OVERLAY_SCROLLED = 'PLAYER_OVERLAY_SCROLLED';
export const REFERRER_PAGE = 'REFERRER_PAGE';
export const SHOW_NEW_WEB_INFO_MODAL = 'SHOW_NEW_WEB_INFO_MODAL';
export const HIDE_NEW_WEB_INFO_MODAL = 'HIDE_NEW_WEB_INFO_MODAL';
export const LOGIN_REDIRECT_URL = 'LOGIN_REDIRECT_URL';
export const LOGIN_DEVICE_TYPE = 'LOGIN_DEVICE_TYPE';

export const displaySignupModal = text => ({
  type: DISPLAY_SIGNUP_MODAL,
  text,
});

export const closeSignupModal = () => ({
  type: CLOSE_SIGNUP_MODAL,
});

export const displayNewsletterModal = () => ({
  type: DISPLAY_NEWSLETTER_MODAL,
});

export const closeNewsletterModal = () => ({
  type: CLOSE_NEWSLETTER_MODAL,
});

export const displayCollectionModal = () => ({
  type: DISPLAY_COLLECTION_MODAL,
});

export const closeCollectionModal = () => ({
  type: CLOSE_COLLECTION_MODAL,
});

export const displayNotificationsModal = text => ({
  type: DISPLAY_NOTIFICATIONS_MODAL,
  text,
});

export const closeNotificationsModal = () => ({
  type: CLOSE_NOTIFICATIONS_MODAL,
});

export const markAsPlayed = () => ({
  type: MARK_AS_PLAYED,
});

export const notificationPermissionRequested = () => ({
  type: NOTIFICATION_PERMISSION_REQUESTED,
});

export const notificationRejected = () => ({
  type: NOTIFICATION_PERMISSION_REJECTED,
});

export const refreshEpisodeListCompleted = () => ({
  type: REFRESH_EPISODE_LIST_COMPLETED,
});

export function showReportModal() {
  return async dispatch => dispatch({ type: COMMENTS_SHOW_REPORT_MODAL });
}

export function hideReportModal() {
  return async dispatch => dispatch({ type: COMMENTS_HIDE_REPORT_MODAL });
}

export function hideNewWebInfoModal() {
  return async dispatch => dispatch({ type: HIDE_NEW_WEB_INFO_MODAL });
}

export const playerOverlayScrolled = () => ({
  type: PLAYER_OVERLAY_SCROLLED,
});

export const referrerPage = page => ({
  type: REFERRER_PAGE,
  page,
});

export const loginRedirectURL = url => ({
  type: LOGIN_REDIRECT_URL,
  url,
});

export const setLoginDeviceType = (deviceType, payload = null) => ({
  type: LOGIN_DEVICE_TYPE,
  deviceType,
  ...(payload && { ...payload }),
});

