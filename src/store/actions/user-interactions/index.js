export const DISPLAY_SIGNUP_MODAL = 'DISPLAY_SIGNUP_MODAL';
export const CLOSE_SIGNUP_MODAL = 'CLOSE_SIGNUP_MODAL';
export const PLAYER_OVERLAY_SCROLLED = 'PLAYER_OVERLAY_SCROLLED';

export const displaySignupModal = text => ({
  type: DISPLAY_SIGNUP_MODAL,
  text,
});

export const closeSignupModal = () => ({
  type: CLOSE_SIGNUP_MODAL,
});

export const playerOverlayScrolled = () => ({
  type: PLAYER_OVERLAY_SCROLLED,
});
