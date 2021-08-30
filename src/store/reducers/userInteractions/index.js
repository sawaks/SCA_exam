import {
  CLOSE_NEWSLETTER_MODAL,
  CLOSE_SIGNUP_MODAL,
  CLOSE_NOTIFICATIONS_MODAL,
  CLOSE_COLLECTION_MODAL,
  DISPLAY_NEWSLETTER_MODAL,
  DISPLAY_COLLECTION_MODAL,
  DISPLAY_SIGNUP_MODAL,
  DISPLAY_NOTIFICATIONS_MODAL,
  REFRESH_EPISODE_LIST_COMPLETED,
  COMMENTS_SHOW_REPORT_MODAL,
  COMMENTS_HIDE_REPORT_MODAL,
  SHOW_NEW_WEB_INFO_MODAL,
  HIDE_NEW_WEB_INFO_MODAL,
  NOTIFICATION_PERMISSION_REQUESTED,
  NOTIFICATION_PERMISSION_REJECTED,
  REFERRER_PAGE,
  PLAYER_OVERLAY_SCROLLED, MARK_AS_PLAYED,
  LOGIN_REDIRECT_URL, LOGIN_DEVICE_TYPE,
} from 'store/actions/userInteractions';

const initialState = {
  displaySignUpModal: false,
  displayCollectionModal: false,
  signUpModalText: '',
  displayNewsletterModal: false,
  displayNotificationModal: false,
  refreshEpisodeList: false,
  showReportModal: false,
  notificationPermissionRequested: false,
  notificationPermissionRejected: false,
  displayNewWebInfoModal: false,
  playerOverlayAScrolled: false,
  referrerPage: '',
  redirectUrl: null,
};

export default function userInteractions(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_SIGNUP_MODAL:
      return {
        ...state,
        displaySignUpModal: true,
        signUpModalText: action.text,
      };
    case CLOSE_SIGNUP_MODAL:
      return {
        ...state,
        displaySignUpModal: false,
      };
    case DISPLAY_NEWSLETTER_MODAL:
      return {
        ...state,
        displayNewsletterModal: true,
      };
    case CLOSE_NEWSLETTER_MODAL:
      return {
        ...state,
        displayNewsletterModal: false,
      };
    case DISPLAY_COLLECTION_MODAL:
      return {
        ...state,
        displayCollectionModal: true,
      };
    case CLOSE_COLLECTION_MODAL:
      return {
        ...state,
        displayCollectionModal: false,
      };
    case SHOW_NEW_WEB_INFO_MODAL:
      return {
        ...state,
        displayNewWebInfoModal: true,
      };
    case HIDE_NEW_WEB_INFO_MODAL:
      return {
        ...state,
        displayNewWebInfoModal: false,
      };
    case DISPLAY_NOTIFICATIONS_MODAL:
      return {
        ...state,
        displayNotificationsModal: true,
        notificationsModalText: action.text,
      };
    case CLOSE_NOTIFICATIONS_MODAL:
      return {
        ...state,
        displayNotificationsModal: false,
      };
    case NOTIFICATION_PERMISSION_REQUESTED:
      return {
        ...state,
        notificationPermissionRequested: true,
        notificationPermissionRejected: false,
      };
    case NOTIFICATION_PERMISSION_REJECTED:
      return {
        ...state,
        notificationPermissionRejected: true,
        notificationPermissionRequested: false,
      };
    case MARK_AS_PLAYED: {
      return {
        ...state,
        refreshEpisodeList: true,
      };
    }
    case REFRESH_EPISODE_LIST_COMPLETED: {
      return {
        ...state,
        refreshEpisodeList: false,
      };
    }
    case COMMENTS_SHOW_REPORT_MODAL: {
      return {
        ...state,
        showReportModal: true,
      };
    }
    case COMMENTS_HIDE_REPORT_MODAL: {
      return {
        ...state,
        showReportModal: false,
      };
    }
    case PLAYER_OVERLAY_SCROLLED:
      return {
        ...state,
        playerOverlayAScrolled: true,
      };
    case REFERRER_PAGE:
      return {
        ...state,
        referrerPage: action.page,
      };
    case LOGIN_REDIRECT_URL:
      return {
        ...state,
        redirectUrl: action.url,
      };
    case LOGIN_DEVICE_TYPE:
      return {
        ...state,
        deviceType: action.deviceType,
        oAuthRedirectUri: action.oAuthRedirectUri || null,
        oAuthState: action.oAuthState || null,
      };
    default:
      return state;
  }
}
