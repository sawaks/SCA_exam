export const NOW_PLAYING_SUBSCRIBE_PLAYER_OVERLAY = 'NOW_PLAYING_SUBSCRIBE_PLAYER_OVERLAY';
export const NOW_PLAYING_UNSUBSCRIBE_PLAYER_OVERLAY = 'NOW_PLAYING_UNSUBSCRIBE_PLAYER_OVERLAY';
export const NOW_PLAYING_SUBSCRIBE = 'NOW_PLAYING_SUBSCRIBE';
export const NOW_PLAYING_UNSUBSCRIBE = 'NOW_PLAYING_UNSUBSCRIBE';
export const NOW_PLAYING_UNSUBSCRIBE_MULTI = 'NOW_PLAYING_UNSUBSCRIBE_MULTI';
export const NOW_PLAYING_MSG_RECEIVED = 'NOW_PLAYING_MSG_RECEIVED';
export const NOW_PLAYING_SUBSCRIBE_MULTI = 'NOW_PLAYING_SUBSCRIBE_MULTI';

export const subscribePlayerOverlay = callSign => ({
  type: NOW_PLAYING_SUBSCRIBE_PLAYER_OVERLAY,
  callSign,
});

export const unsubscribePlayerOverlay = () => ({
  type: NOW_PLAYING_UNSUBSCRIBE_PLAYER_OVERLAY,
});

export function subscribeSingle(callSign) {
  return {
    type: NOW_PLAYING_SUBSCRIBE,
    callSign,
  };
}

export function subscribeMulti(callSigns) {
  return {
    type: NOW_PLAYING_SUBSCRIBE_MULTI,
    callSigns,
  };
}

export function unSubscribeSingle(callSign, killOrigin = false) {
  return {
    type: NOW_PLAYING_UNSUBSCRIBE,
    callSign,
    killOrigin,
  };
}

export function unSubscribeMulti(callSigns) {
  return {
    type: NOW_PLAYING_UNSUBSCRIBE_MULTI,
    callSigns,
  };
}

export function onMessage(msg) {
  const message = JSON.parse(msg?.data) || null;
  const { data: { stations } } = message;
  const payload = stations ? stations[0] : null;
  if (payload) {
    return {
      type: NOW_PLAYING_MSG_RECEIVED,
      payload,
    };
  }
  return {
    type: NOW_PLAYING_MSG_RECEIVED,
  };
}
