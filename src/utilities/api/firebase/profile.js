import 'firebase/firestore';

import firebase from 'firebase/app';
import { FCM_DEVICES, USERS_COLLECTION } from 'utilities/api/firebase/collections';
import { setFavouriteCategories, setFavouriteShows, setFavouriteGenres, setFavouriteStations } from 'utilities/api/firebase/favourite';

export async function setProfileData(user, favouriteCategories, favouriteShows, favouriteGenres, favouriteStations) {
  const db = firebase.firestore();

  await db.collection(USERS_COLLECTION)
    .doc(user.uid)
    .set({ ...user }, { merge: true });

  await setFavouriteCategories(user.uid, favouriteCategories);
  await setFavouriteGenres(user.uid, favouriteGenres);

  if (favouriteStations.length) {
    await setFavouriteStations(user.uid, favouriteStations);
  }
  return setFavouriteShows(user.uid, favouriteShows);
}

export function updateProfileData(payload, id) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(id)
    .set({ ...payload }, { merge: true });
}

/**
 * @method readData
 * @description Get snaphot of current user profile info.
 * @param {string} id
 * @returns {Promise}
 */
export function readProfileData(id) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(`${id}`)
    .get();
}

export function readDevices(userId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FCM_DEVICES)
    .get();
}

export async function updateUserDeviceInfo(userId, token, deviceID) {
  const documentRef = await firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FCM_DEVICES)
    .doc(deviceID);

  const document = await documentRef.get();

  if (document.exists) {
    // only update if the new token has changed.
    if (document.data().token !== token) {
      return documentRef.set({ token });
    }
  }
  return documentRef.set({ token });
}

export async function removeUserFCMDevice(userId, deviceId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FCM_DEVICES)
    .doc(deviceId)
    .delete();
}

export async function setMusicOnboarding(userId) {
  return firebase.firestore().collection(USERS_COLLECTION)
    .doc(userId)
    .set({ hasUserOnboardedMusic: true }, { merge: true });
}
