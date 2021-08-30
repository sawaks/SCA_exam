import { FEATURE_SWITCH_ADD_FLAGS } from 'store/actions/featureFlags';

const initialState = {
  ready: true,
  allFlags: {},
};

export default function featureFlags(state = initialState, action) {
  switch (action.type) {
    case FEATURE_SWITCH_ADD_FLAGS: {
      return {
        ...state,
        allFlags: {
          ...state.allFlags,
          ...action.flags,
        },
      };
    }
    default:
      return state;
  }
}

