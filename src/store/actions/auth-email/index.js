import sha256 from 'js-sha256';
import { fetchDevices } from 'store/actions/profile';
import { addPersonalisedInformationToStore } from 'store/actions/userSessionInfo';
import * as authApi from 'utilities/api/firebase/auth';
import * as favouriteApi from 'utilities/api/firebase/favourite';
import { generateMyFeed, generateStationsFeed } from 'store/actions/my-feed';
import * as listenedEpisodesApi from 'utilities/api/firebase/listenedEpisodes';
import * as profileApi from 'utilities/api/firebase/profile';
import { isEdgeInPrivateMode } from 'utilities/helpers/browser';
import Cookie from 'js-cookie';
import getDeviceID from 'utilities/helpers/getDeviceInfo';
import getISOStringWithoutMillisec from 'utilities/helpers/getISOStringWithoutMillisec';
import Logger from 'utilities/helpers/logger';
import toast from 'utilities/helpers/toast';
import { getOnboardFavStations } from '../../../utilities/api/graphql/stations/queryMethods';

export const LOGIN_WITH_EMAIL_COMPLETE = 'LOGIN_WITH_EMAIL_COMPLETE';
export const LOGIN_WITH_EMAIL_ERROR = 'LOGIN_WITH_EMAIL_ERROR';
export const SIGN_UP_WITH_EMAIL_ERROR = 'SIGN_UP_WITH_EMAIL_ERROR';
export const SIGN_UP_WITH_EMAIL_COMPLETE = 'SIGN_UP_WITH_EMAIL_COMPLETE';
export const SET_NEW_PASSWORD_VERIFICATION_CODE_COMPLETE = 'SET_NEW_PASSWORD_VERIFICATION_CODE_COMPLETE';
export const SET_NEW_PASSWORD_VERIFICATION_CODE_ERROR = 'SET_NEW_PASSWORD_VERIFICATION_CODE_ERROR';
export const SET_NEW_PASSWORD_COMPLETE = 'SET_NEW_PASSWORD_COMPLETE';
export const RESET_PASSWORD_WITH_EMAIL_ERROR = 'RESET_PASSWORD_WITH_EMAIL_ERROR';
export const RESET_PASSWORD_WITH_EMAIL_COMPLETE = 'RESET_PASSWORD_WITH_EMAIL_COMPLETE';
export const EMAIL_VERIFICATION_COMPLETE = 'EMAIL_VERIFICATION_COMPLETE';
export const EMAIL_VERIFICATION_ERROR = 'EMAIL_VERIFICATION_ERROR';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const EMAIL_FIREBASE_ERROR = 'EMAIL_FIREBASE_ERROR';

export function verifyEmailExistence(email) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SAVE_EMAIL,
        payload: { email },
      });
      const signInMethods = await authApi.verifyEmailExistence(email);
      await authApi.returnEmailIdentifier();

      // email exists in at least one sign in method
      if (Array.isArray(signInMethods) && signInMethods.length >= 1) {
        return [
          true,
          signInMethods,
        ];
      }

      return [
        false,
        signInMethods,
      ];
    } catch (error) {
      dispatch({
        type: SAVE_EMAIL,
        payload: { email },
      });

      toast(error);
      Logger.error(error);
      throw error;
    }
  };
}

export function loginWithEmail(email, password, setError, setProgress) {
  return async (dispatch) => {
    try {
      // Firebase does not work when Edge is in private mode
      if (isEdgeInPrivateMode()) {
        toast({ code: 'edge/privateMode' });
      }

      const signIn = await authApi.signInWithEmail(email, password);
      const { user: { uid, emailVerified } } = signIn;
      // read user data
      const isExistingUser = await profileApi.readProfileData(uid);
      const userData = isExistingUser ? isExistingUser.data() : null;
      const favouriteCategories = await favouriteApi.readFavouriteCategories(uid);
      const favouriteShows = await favouriteApi.readFavouriteShows(uid);
      const favouriteStations = await favouriteApi.readFavouriteStations(uid);
      const favouriteGenres = await favouriteApi.readFavouriteGenres(uid);
      const episodes = await listenedEpisodesApi.readListenedEpisodes(uid);
      const todayDate = getISOStringWithoutMillisec(new Date());
      const deviceId = getDeviceID();
      const devices = await fetchDevices(uid);
      // Has the current device being registered for FCM.
      const isFCMRegistered = Object.prototype.hasOwnProperty.call(devices, deviceId);

      const payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: userData.name || `${userData.firstName} ${userData.lastName}`,
        email: userData.email || false,
        dob: userData.dob || false,
        postcode: userData.postcode || false,
        gender: userData.gender || false,
        userId: uid,
        loginMethod: 'email',
        lastLoginDate: todayDate,
        emailVerificationFlag: emailVerified,
        hasUserOnboardedMusic: userData.hasUserOnboardedMusic || false,
        fcm: {
          isFCMRegistered,
          userDeviceId: deviceId,
          devices,
        },
      };
      setError(false);
      await dispatch(addPersonalisedInformationToStore(favouriteShows, favouriteCategories, episodes, favouriteGenres, favouriteStations));

      dispatch({
        type: LOGIN_WITH_EMAIL_COMPLETE,
        payload,
      });

      // Set profile cookie
      Cookie.set('listnr_profile', todayDate);

      return { userId: uid, emailVerificationFlag: emailVerified, hasUserOnboardedMusic: userData.hasUserOnboardedMusic };
    } catch (error) {
      setError(true);
      setProgress(false);
      dispatch({
        type: LOGIN_WITH_EMAIL_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

/**
 *
  * @method signupWithEmail
  * @description Creates a new user and save the users information into Firebase and redux store.
  * @param {object} formData
  * @returns {Promise}
 */
export function signupWithEmail(formData) {
  const appSpecificFields = {
    useMobileDataForDownload: false,
    autoDownloadNewEpisodesFromFavourite: false,
    autoDeleteDownloads: true,
    pushNotificationEnabled: true,
  };
  return async (dispatch) => {
    try {
      const data = await authApi.newEmailAuth(formData.email, formData.password);
      const { user } = data;
      authApi.sendEmailVerification(formData.email);

      const id = user.uid;
      const todayDate = getISOStringWithoutMillisec(new Date());
      const userPayload = {
        email: formData.email,
        emailSha256: sha256(formData.email),
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        postcode: formData.postcode,
        dob: formData.dob,
        loginMethod: 'email',
        signUpApp: formData.signUpApp,
        createDate: todayDate,
        firstSignUpDate: todayDate,
        lastUpdateDate: todayDate,
        lastLoginDate: todayDate,
        emailVerificationFlag: false,
        marketingPermissionFlag: formData.receivePromo,
        uid: id,
        hasUserOnboardedMusic: formData.hasUserOnboardedMusic,
        ...appSpecificFields,
      };

      let favouriteStations = [];
      if (formData.stations.length) {
        favouriteStations = await getOnboardFavStations(userPayload.postcode, formData.stations);
      }
      await profileApi.setProfileData(userPayload, formData.categories, formData.shows, formData.genres, favouriteStations);

      dispatch({
        type: SIGN_UP_WITH_EMAIL_COMPLETE,
        payload: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          postcode: formData.postcode,
          gender: formData.gender,
          signUpApp: formData.signUpApp,
          userId: id,
          isExistingUser: false,
          emailVerificationFlag: false,
          marketingPermissionFlag: formData.receivePromo,
          favouriteCategories: [...formData.categories],
          favouriteShows: [...formData.shows],
          favouriteGenres: [...formData.genres],
          hasUserOnboardedMusic: formData.hasUserOnboardedMusic,
          ...appSpecificFields,
        },
      });
      await Promise.all([
        dispatch(generateMyFeed(id, [...formData.categories], [...formData.shows])),
        dispatch(generateStationsFeed(id, [...formData.genres], favouriteStations)),
      ]);
      await dispatch(addPersonalisedInformationToStore(formData.shows, formData.categories, {}, formData.genres, favouriteStations));
      return true;
    } catch (error) {
      dispatch({
        type: SIGN_UP_WITH_EMAIL_ERROR,
        error,
      });

      toast(error);
      Logger.error(error);
      throw error;
    }
  };
}

/**
 *
  * @method resetPasswordWithEmail
  * @description Resets a user password by sending them an email.
  * @param {string} email
  * @returns {Promise}
 */
export function resetPasswordWithEmail(email) {
  return async (dispatch) => {
    try {
      await authApi.resetPassword(email);
      dispatch({ type: RESET_PASSWORD_WITH_EMAIL_COMPLETE });
      return true;
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_WITH_EMAIL_ERROR,
        error,
      });

      Logger.error(error);
      throw error;
    }
  };
}

export function confirmPasswordReset(actionCode, newPassword) {
  return async (dispatch) => {
    try {
      await authApi.confirmPasswordReset(actionCode, newPassword);
      dispatch({ type: SET_NEW_PASSWORD_COMPLETE });
    } catch (error) {
      dispatch({ type: SET_NEW_PASSWORD_VERIFICATION_CODE_ERROR, error });
      Logger.error(error);
      throw error;
    }
  };
}

export function verifyPasswordResetCode(actionCode) {
  return async (dispatch) => {
    try {
      const email = await authApi.verifyPasswordResetCode(actionCode);
      dispatch({ type: SET_NEW_PASSWORD_VERIFICATION_CODE_COMPLETE });
      return email;
    } catch (error) {
      dispatch({ type: SET_NEW_PASSWORD_VERIFICATION_CODE_ERROR, error });
      Logger.error(error);
      throw error;
    }
  };
}

export function verifyEmail(actionCode) {
  return async (dispatch) => {
    try {
      const { data: { email } } = await authApi.checkActionCode(actionCode);
      await authApi.applyActionCode(actionCode);
      await authApi.updateEmailVerificationFlag(email);
      dispatch({
        type: EMAIL_VERIFICATION_COMPLETE,
        payload: {
          emailVerificationFlag: true,
        } });
      return true;
    } catch (error) {
      dispatch({ type: EMAIL_VERIFICATION_ERROR, error });
      Logger.error(error);
      throw error;
    }
  };
}
