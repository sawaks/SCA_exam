import { CLOSE_SIGNUP_MODAL, DISPLAY_SIGNUP_MODAL } from 'store/actions/user-interactions';

const initialState = {
  displaySignUpModal: false,
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
    default:
      return state;
  }
}
