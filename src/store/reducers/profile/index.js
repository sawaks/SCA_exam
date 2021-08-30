import {
  EMAIL_FIREBASE_ERROR, EMAIL_VERIFICATION_COMPLETE,
  LOGIN_WITH_EMAIL_COMPLETE,
  LOGIN_WITH_EMAIL_ERROR,
  RESET_PASSWORD_WITH_EMAIL_COMPLETE,
  RESET_PASSWORD_WITH_EMAIL_ERROR,
  SAVE_EMAIL,
  SIGN_UP_WITH_EMAIL_COMPLETE,
  SIGN_UP_WITH_EMAIL_ERROR,
} from 'store/actions/auth-email';
import {
  PROFILE_ADD_TOKEN_COMPLETE,
  PROFILE_FETCH_COMPLETE,
  PROFILE_FETCH_ERROR,
  PROFILE_FETCH_PROGRESS,
  PROFILE_SIGNOUT_ERROR,
  PROFILE_SIGNOUT_SUCCESS,
  PROFILE_UPDATE_COMPLETE,
  PROFILE_UPDATE_ERROR,
  PROFILE_VERIFY_MODAL_DISPLAYED,
  ASSUME_LOGGED_IN,
} from 'store/actions/profile';

import { AUDIO_UPDATE_CURRENT_TIME } from '../../actions/audio-player';

const initialState = {
  dob: null,
  email: null,
  emailVerificationFlag: false,
  error: null,
  firebaseEpisodesUpToDate: true,
  firstName: null,
  gender: null,
  hasUserOnboardedMusic: false,
  hasVerifyModalShown: null,
  inProgress: null,
  isEmailSignUp: null,
  isExistingUser: false,
  lastName: null,
  postcode: null,
  receivePromo: false,
  sentResetPass: null,
  userId: null,
  assumeLoggedIn: false,
  fcm: {
    isFCMRegistered: false,
    userDeviceId: null,
    devices: {},
  },
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_FETCH_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case PROFILE_FETCH_ERROR:
    case PROFILE_UPDATE_ERROR:
    case PROFILE_SIGNOUT_ERROR:
    case SIGN_UP_WITH_EMAIL_ERROR:
    case RESET_PASSWORD_WITH_EMAIL_ERROR:
    case EMAIL_FIREBASE_ERROR:
    case LOGIN_WITH_EMAIL_ERROR:
    case LOGIN_WITH_EMAIL_COMPLETE:
    case SIGN_UP_WITH_EMAIL_COMPLETE:
    case PROFILE_FETCH_COMPLETE:
    case SAVE_EMAIL:
    case EMAIL_VERIFICATION_COMPLETE:
    case PROFILE_UPDATE_COMPLETE:
      return {
        ...state,
        inProgress: false,
        error: false,
        firebaseEpisodesUpToDate: true,
        ...action.payload,
      };
    case PROFILE_SIGNOUT_SUCCESS:
      return {
        ...initialState,
        inProgress: false,
      };
    case RESET_PASSWORD_WITH_EMAIL_COMPLETE:
      return {
        ...state,
        sentResetPass: true,
      };
    case PROFILE_VERIFY_MODAL_DISPLAYED:
      return {
        ...state,
        hasVerifyModalShown: true,
      };

    case AUDIO_UPDATE_CURRENT_TIME:
      return {
        ...state,
        firebaseEpisodesUpToDate: false,
      };
    case PROFILE_ADD_TOKEN_COMPLETE:
      return {
        ...state,
        FCMToken: action.token,
        deviceID: action.deviceID,
      };
    case ASSUME_LOGGED_IN:
      return {
        ...state,
        assumeLoggedIn: action.hasPersistCookie,
      };
    default:
      return state;
  }
}
