import {
  NOW_PLAYING_MSG_RECEIVED,
  NOW_PLAYING_SUBSCRIBE,
  NOW_PLAYING_SUBSCRIBE_MULTI,
  NOW_PLAYING_SUBSCRIBE_PLAYER_OVERLAY,
  NOW_PLAYING_UNSUBSCRIBE,
  NOW_PLAYING_UNSUBSCRIBE_MULTI,
  NOW_PLAYING_UNSUBSCRIBE_PLAYER_OVERLAY,
} from 'store/actions/now-playing';

const initialState = {
  pageSubscriptions: [],
  playerSubscription: null,
};

export default function nowPlaying(state = initialState, action = {}) {
  switch (action.type) {
    case NOW_PLAYING_SUBSCRIBE_PLAYER_OVERLAY: {
      const callSign = action.callSign?.toLowerCase();
      return {
        ...state,
        playerSubscription: callSign,
      };
    }
    case NOW_PLAYING_SUBSCRIBE: {
      const callSign = action.callSign?.toLowerCase();

      if (state.pageSubscriptions.includes(callSign)) {
        return state;
      }

      return {
        ...state,
        pageSubscriptions: [...state.pageSubscriptions, callSign],
      };
    }
    case NOW_PLAYING_SUBSCRIBE_MULTI: {
      return {
        ...state,
        pageSubscriptions: [...state.pageSubscriptions, ...action.callSigns],
      };
    }
    case NOW_PLAYING_UNSUBSCRIBE_PLAYER_OVERLAY: {
      const newState = { ...state };
      if (!newState.pageSubscriptions.includes(newState.playerSubscription)) {
        delete newState[newState.playerSubscription];
      }
      newState.playerSubscription = null;

      return newState;
    }
    case NOW_PLAYING_UNSUBSCRIBE: {
      const callSign = action.callSign?.toLowerCase();
      const newState = { ...state };
      if (callSign === newState.playerSubscription) {
        newState.pageSubscriptions = newState.pageSubscriptions.filter(item => item !== callSign);
        return newState;
      }
      delete newState[callSign];
      newState.pageSubscriptions = newState.pageSubscriptions.filter(item => item !== callSign);

      return newState;
    }
    case NOW_PLAYING_UNSUBSCRIBE_MULTI: {
      const { callSigns } = action;

      const newState = { ...state };
      callSigns.forEach((callSign) => {
        if (callSign !== newState.playerSubscription) {
          delete newState[callSign];
        }
      });
      newState.pageSubscriptions = [newState.playerSubscription];

      return newState;
    }
    case NOW_PLAYING_MSG_RECEIVED: {
      return {
        ...state,
        [action?.payload?.station]: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
