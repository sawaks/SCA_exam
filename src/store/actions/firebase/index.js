export const FIREBASE_READY = 'FIREBASE_READY';

export function firebaseReady() {
  return async dispatch => dispatch({
    type: FIREBASE_READY,
  });
}

