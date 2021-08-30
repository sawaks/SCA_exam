import 'firebase/firestore';
import firebase from 'firebase/app';
import { USERS_COLLECTION, DEVICE_FLOW } from 'utilities/api/firebase/collections';
/**
 *
 * @method add auth-code in our database in user collection
 * @param {string} uid
 * @param {string} code
 * @returns {Promise}
 */
// eslint-disable-next-line import/prefer-default-export
export async function addAuthCode(uid, code) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(uid)
    .update({
      oAuthCode: code,
      oAuthCodeCreated: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

/**
 *
 * @method check if the given user code exists in device flow.
 * @param {string} userCode
 * @returns {Boolean}
 */
// eslint-disable-next-line import/prefer-default-export
export async function checkUserCode(userCode) {
  const results = await firebase.firestore()
    .collection(DEVICE_FLOW)
    .doc(userCode)
    .get();

  return results.exists;
}

/**
 *
 * @method save uid against user code
 * @param {string} userCode
 * @param {string} uid
 * @returns {Boolean}
 */
// eslint-disable-next-line import/prefer-default-export
export async function saveUidInDeviceFlow(userCode, uid) {
  return firebase.firestore()
    .collection(DEVICE_FLOW)
    .doc(userCode)
    .set({ uid }, { merge: true });
}

