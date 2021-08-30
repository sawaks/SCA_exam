import 'firebase/auth';
import 'firebase/functions';

import firebase from 'firebase/app';

/**
 *
 * @method newEmailOauth
 * @description Signup a user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export function newEmailAuth(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

/**
 * @method getUser
 * @description Get current user.
 * @returns {Promise}
 */
export function getUser() {
  return new Promise(resolve => firebase.auth().onAuthStateChanged(resolve));
}

/**
 * @method resetPassword
 * @description Reset a user's password.
 * @returns {Promise}
 */
export function resetPassword(email) {
  // Now calls our own Reset Email function
  const functions = firebase.app().functions('australia-southeast1');
  const resetEmail = functions.httpsCallable('resetPasswordEmail');
  return resetEmail({ email });
}

/**
 * @method signout
 * @description Signout the current user.
 * @returns {Promise}
 */
export function signout() {
  return firebase.auth().signOut();
}

/**
 * @method signInWithEmail
 * @description Signs in a user and sets their persistence state to
 * Local or Session if they have ticked remember me
 * @export
 * @param {string} email
 * @param {string} password
 * @param {boolean} persist
 * @returns {Promise}
 */
export function signInWithEmail(email, password, persist = true) {
  const { SESSION, LOCAL } = firebase.auth.Auth.Persistence;
  let persistenceState = SESSION;

  if (persist) {
    persistenceState = LOCAL;
  }

  firebase.auth().setPersistence(persistenceState);
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

/**
 * @method createUserWithEmail
 * @description Creates a new user via email login
 * @export
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export function createUserWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

/**
 * @method verifyEmailExistence
 * @description Verify if email exists in Firebase
 * @export
 * @param {string} email
 * @returns {Promise}
 */
export function verifyEmailExistence(email) {
  return firebase.auth().fetchSignInMethodsForEmail(email);
}

/**
 * @method returnEmailIdentifier
 * @description Returns the email sign-in method identifier
 * @export
 * @returns {Promise}
 */
export function returnEmailIdentifier() {
  return firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD;
}

/**
 * @method sendEmailVerification
 * @description Resend the email verification email
 * @export
 * @returns {Promise}
 */
export async function sendEmailVerification(email) {
  const functions = firebase.app().functions('australia-southeast1');
  const activationEmail = functions.httpsCallable('activationEmail');
  return activationEmail({ email });
}

export function verifyPasswordResetCode(actionCode) {
  return firebase.auth().verifyPasswordResetCode(actionCode);
}

export function confirmPasswordReset(actionCode, newPassword) {
  return firebase.auth().confirmPasswordReset(actionCode, newPassword);
}

export function applyActionCode(actionCode) {
  return firebase.auth().applyActionCode(actionCode);
}

export function checkActionCode(actionCode) {
  return firebase.auth().checkActionCode(actionCode);
}

export async function updateEmailVerificationFlag(email) {
  const functions = firebase.app().functions('australia-southeast1');
  const updateEmailFlag = functions.httpsCallable('updateEmailVerificationFlag');
  return updateEmailFlag({ email });
}
