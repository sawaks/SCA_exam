/**
   * msg
   * @description Message code must return a title string and a text string.
   */
const msg = {
  'auth/email-already-in-use': {
    title: 'Email already in use',
    text: 'Try again with a different email or login if you already have an account.',
  },
  'auth/invalid-email': {
    title: 'Incorrect email',
    text: 'Sorry, we don\'t have an account for that email. Try signing up instead.',
  },
  'auth/weak-password': {
    title: 'Please enter a stronger password',
    text: 'Your password should include at least 6 characters with letters and numbers.',
  },
  'auth/wrong-password': {
    title: 'Incorrect password',
    text: 'Sorry, the password you\'ve entered is incorrect. ',
  },
  'auth/user-not-found': {
    title: 'Incorrect email',
    text: 'Sorry, we don\'t have an account for that email. Try signing up instead.',
  },
  'auth/account-exists-with-different-credential': {
    title: 'Account already exists',
    text: 'Login with the original account that you created on the app or web, or sign up using a different email.',
  },
  'auth/cancelled-popup-request': {
    title: 'Your browser blocked the popup',
    text: 'Please enable popups and try again.',
  },
  'auth/popup-blocked': {
    title: 'Your browser blocked the popup',
    text: 'Please enable popups and try again.',
  },
  'auth/popup-closed-by-user': {
    title: 'We were unable to process your request',
    text: 'The window was closed before we could log you in. Please try again.',
  },
  'auth/too-many-requests': {
    title: 'Something went wrong',
    text: 'Please try again in a few minutes.',
  },
  'feed/too-many-requests': {
    title: 'Something went wrong',
    text: 'Please try again in a few minutes.',
  },
  'safari/privateMode': {
    title: 'We can\'t log you in with Google or Facebook on Safari when private browsing is enabled',
    text: 'You\'ll need to switch to a normal tab to Login or Sign Up.',
  },
  'edge/privateMode': {
    title: 'We can\'t log you in on Edge when you are browsing InPrivate',
    text: 'You\'ll need to switch to a normal tab to Login.',
  },
  default: {
    title: 'Something went wrong',
    text: 'Sorry, an unexpected error has occurred. Please try again later',
  },
};

export default msg;

