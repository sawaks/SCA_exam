import * as player from 'components/Player/AudioPlayer/player';
import sha256 from 'js-sha256';
import { AUDIO_RESET_CHANGE_COUNTER } from 'store/actions/audio-player';
import * as authApi from 'utilities/api/firebase/auth';
import * as favouriteApi from 'utilities/api/firebase/favourite';
import * as listenedEpisodesApi from 'utilities/api/firebase/listenedEpisodes';
import * as profileApi from 'utilities/api/firebase/profile';
import getDeviceID from 'utilities/helpers/getDeviceInfo';
import getISOStringWithoutMillisec from 'utilities/helpers/getISOStringWithoutMillisec';
import Logger from 'utilities/helpers/logger';
import Cookies from 'js-cookie';
import toast from 'utilities/helpers/toast';
import { addPersonalisedInformationToStore } from '../userSessionInfo';

export const PROFILE_FETCH_PROGRESS = 'PROFILE_FETCH_PROGRESS';
export const PROFILE_FETCH_ERROR = 'PROFILE_FETCH_ERROR';
export const PROFILE_FETCH_COMPLETE = 'PROFILE_FETCH_COMPLETE';
export const PROFILE_UPDATE_PROGRESS = 'PROFILE_UPDATE_PROGRESS';
export const PROFILE_UPDATE_ERROR = 'PROFILE_UPDATE_ERROR';
export const PROFILE_UPDATE_COMPLETE = 'PROFILE_UPDATE_COMPLETE';
export const PROFILE_ADD_FAVOURITE_PODCAST = 'PROFILE_ADD_FAVOURITE_PODCAST';
export const PROFILE_DELETE_FAVOURITE_PODCAST = 'PROFILE_DELETE_FAVOURITE_PODCAST';
export const PROFILE_SIGNOUT_SUCCESS = 'PROFILE_SIGNOUT_SUCCESS';
export const PROFILE_SIGNOUT_ERROR = 'PROFILE_SIGNOUT_ERROR';
export const PROFILE_VERIFY_MODAL_DISPLAYED = 'PROFILE_VERIFY_MODAL_DISPLAYED';
export const PROFILE_ADD_TOKEN_COMPLETE = 'PROFILE_ADD_TOKEN_COMPLETE';
export const PROFILE_ADD_TOKEN_ERROR = 'PROFILE_ADD_TOKEN_ERROR';
export const PROFILE_REMOVE_TOKEN_ERROR = 'PROFILE_REMOVE_TOKEN_ERROR';
export const ASSUME_LOGGED_IN = 'ASSUME_LOGGED_IN';

export async function fetchDevices(userId) {
  const devicesSnapshot = await profileApi.readDevices(userId);
  return devicesSnapshot.docs.reduce((acc, doc) => (
    {
      [doc.id]: doc.data().token,
      ...acc,
    }
  ), {});
}

/**
 * @method fetchUserProfile
 * @description Retrieve the login status of the user.
 * If the user is already logged in update the redux store with the stored information on Firebase.
 * @returns {Promise}
 */
export function fetchUserProfile() {
  return async (dispatch) => {
    try {
      dispatch({
        type: PROFILE_FETCH_PROGRESS,
      });

      const user = await authApi.getUser();

      if (!user) {
        dispatch({
          type: PROFILE_FETCH_COMPLETE,
          payload: {
            userId: '',
          },
        });
        return false;
      }
      const id = user.uid;

      const snapshot = await profileApi.readProfileData(id);
      const moreInfo = snapshot.data() || {};
      const favouriteCategories = await favouriteApi.readFavouriteCategories(id);
      const favouriteShows = await favouriteApi.readFavouriteShows(id);
      const favouriteStations = await favouriteApi.readFavouriteStations(id);
      const favouriteGenres = await favouriteApi.readFavouriteGenres(id);
      const episodes = await listenedEpisodesApi.readListenedEpisodes(id);

      const deviceId = getDeviceID();
      const devices = await fetchDevices(id);
      // Has the current device being registered for FCM.
      const isFCMRegistered = Object.prototype.hasOwnProperty.call(devices, deviceId);
      await dispatch(addPersonalisedInformationToStore(favouriteShows, favouriteCategories, episodes, favouriteGenres, favouriteStations));

      dispatch({
        type: PROFILE_FETCH_COMPLETE,
        payload: {
          firstName: moreInfo.firstName,
          lastName: moreInfo.lastName,
          name: moreInfo.name || `${moreInfo.firstName} ${moreInfo.lastName}`,
          email: moreInfo.email || false,
          dob: moreInfo.dob || false,
          postcode: moreInfo.postcode || false,
          gender: moreInfo.gender || false,
          loginMethod: moreInfo.loginMethod || 'email',
          userId: id,
          isExistingUser: true,
          isEmailSignUp: moreInfo.loginMethod === 'email',
          emailVerificationFlag: moreInfo.emailVerificationFlag,
          hasUserOnboardedMusic: moreInfo.hasUserOnboardedMusic,
          fcm: {
            isFCMRegistered,
            userDeviceId: deviceId,
            devices,
          },
        },
      });
      return true;
    } catch (error) {
      dispatch({
        type: PROFILE_FETCH_ERROR,
        error,
      });
      toast(error);
      Logger.error(error);
      throw error;
    }
  };
}

/**
 * @method updateUserProfile
 * @description Update the user's profile information on Firebase and in the redux store.
 * @param {object} formData
 * @param {string} id
 * @returns {Promise}
 */
export function updateUserProfile(formData, id) {
  return async (dispatch) => {
    try {
      const todayDate = getISOStringWithoutMillisec(new Date());

      const profileInfo = {
        ...(formData.first_name && formData.last_name && { name: `${formData.first_name} ${formData.last_name}` }),
        ...(formData.first_name && { firstName: formData.first_name }),
        ...(formData.last_name && { lastName: formData.last_name }),
        ...(formData.email && { email: formData.email }),
        ...(formData.email && { emailSha256: sha256(formData.email) }),
        ...(formData.date_of_birth && { dob: formData.date_of_birth }),
        ...(formData.postcode && { postcode: formData.postcode }),
        ...(formData.gender && { gender: formData.gender }),
      };

      const payload = {
        ...profileInfo,
        uid: id,
        signUpApp: 'web',
        createDate: todayDate,
        lastUpdateDate: todayDate,
        firstSignUpDate: todayDate,
      };
      await profileApi.setProfileData(payload, id);

      dispatch({
        type: PROFILE_UPDATE_COMPLETE,
        payload: {
          ...profileInfo,
          userId: id,
        },
      });
      return true;
    } catch (error) {
      dispatch({
        type: PROFILE_UPDATE_ERROR,
        error,
      });
      toast(error);
      Logger.error(error);
      throw error;
    }
  };
}

/**
 * @method updateUserDevice
 * @description Update the user's device information on Firebase and in the redux store.
 * @param {string} uid
 * @param {string} token
 * @param {string} deviceID
 * @returns {Promise}
 */
export function updateUserDevice(uid, token, deviceID) {
  return async (dispatch) => {
    try {
      await profileApi.updateUserDeviceInfo(uid, token, deviceID);

      dispatch({
        type: PROFILE_ADD_TOKEN_COMPLETE,
        token,
        deviceID,
      });
      dispatch(fetchUserProfile());
    } catch (error) {
      dispatch({
        type: PROFILE_ADD_TOKEN_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

/**
 * @method signOutUser
 * @description Signs out the current user
 * @returns {Promise}
 */
export function signOutUser() {
  return async (dispatch) => {
    try {
      Cookies.remove('listnr_profile');
      await authApi.signout();
      player.updateSource('', '', '');

      dispatch({ type: AUDIO_RESET_CHANGE_COUNTER });
      dispatch({ type: PROFILE_SIGNOUT_SUCCESS });
      return true;
    } catch (error) {
      dispatch({
        type: PROFILE_SIGNOUT_ERROR,
        error,
      });
      toast(error);
      Logger.error(error);
      throw error;
    }
  };
}

export function assumeLoggedIn() {
  return (dispatch) => {
    const hasPersistCookie = document.cookie.includes('listnr_profile');
    dispatch({
      type: ASSUME_LOGGED_IN,
      hasPersistCookie,
    });
  };
}
