import { PLAYER_OVERLAY_UPDATE_TYPE, PLAYER_OVERLAY_UPDATE_VISIBLE } from 'store/actions/player-overlay';
import { PLAYER_OVERLAY_TYPE } from 'utilities/constants';

const initialState = {
  visible: false,
  type: PLAYER_OVERLAY_TYPE.PODCAST,
};

export default function playerOverLay(state = initialState, action) {
  switch (action.type) {
    case PLAYER_OVERLAY_UPDATE_VISIBLE:
      return {
        ...state,
        visible: action.visible,
      };
    case PLAYER_OVERLAY_UPDATE_TYPE:
      return {
        ...state,
        type: action.playerType,
      };
    default:
      return state;
  }
}
