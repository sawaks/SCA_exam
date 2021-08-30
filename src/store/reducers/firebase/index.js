import { FIREBASE_READY } from 'store/actions/firebase';

const initialState = {
  onReady: false,
};

export default function firebase(state = initialState, action) {
  switch (action.type) {
    case FIREBASE_READY: {
      return {
        ...state,
        onReady: true,
      };
    }
    default:
      return state;
  }
}

