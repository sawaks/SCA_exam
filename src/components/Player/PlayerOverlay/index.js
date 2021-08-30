import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { PLAYER_OVERLAY_TYPE } from 'utilities/constants';
import LiveStreamOverlay from './components/LiveStreamOverlay';
import LiveShowOverlay from './components/LiveShowOverlay';
import PodcastOverlay from './components/PodcastOverlay';

function PlayerOverlay() {
  const type = useSelector(state => state.playerOverlay.type, shallowEqual);

  if (type === PLAYER_OVERLAY_TYPE.LIVE_STREAM) {
    return <LiveStreamOverlay />;
  }

  if (type === PLAYER_OVERLAY_TYPE.LIVE_SHOW) {
    return <LiveShowOverlay />;
  }
  return <PodcastOverlay />;
}

export default PlayerOverlay;
