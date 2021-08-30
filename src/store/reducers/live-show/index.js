import { ADD_LIVE_SHOW_DATA, UPDATE_LIVE_SHOW_DATA, PLAY_LIVE_SHOW, END_LIVE_SHOW } from 'store/actions/live-show';

const initialState = {
  liveShowStartDay: null,
  liveShowStartUTC: null,
  liveShowEndUTC: null,
  liveShowInfo: null,
  liveShowImage: null,
  liveShowBgImage: null,
  liveShowName: null,
  audioStream: null,
  studioPhone: null,
  isLive: false,
};

export default function liveShow(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_LIVE_SHOW_DATA: {
      const isShowLive = (new Date(action?.payload?.startUtc).getTime() < Date.now())
      && (Date.now() < new Date(action?.payload?.endUtc).getTime());
      return {
        ...state,
        liveShowInfo: action.payload.showInfo,
        liveShowStartDay: action.payload.day,
        liveShowStartUTC: action.payload.startUtc,
        liveShowEndUTC: action.payload.endUtc,
        liveShowImage: action.payload.showImage,
        liveShowBgImage: action.payload.bgImage,
        liveShowName: action.payload.showName,
        liveShowSlug: action.payload.showSlug,
        studioPhone: action.payload.studioPhone,
        audioStream: action.payload.audioStream,
        isLive: isShowLive,
      };
    }
    case UPDATE_LIVE_SHOW_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case PLAY_LIVE_SHOW: {
      return {
        ...state,
        isLive: true,
      };
    }
    case END_LIVE_SHOW: {
      return {
        ...state,
        isLive: false,
      };
    }
    default: {
      return state;
    }
  }
}
