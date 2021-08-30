import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { PLAYER_OVERLAY_TYPE } from '../../../utilities/constants';
import CondensedLivePlayer from './components/CondensedLivePlayer';
import CondensedPodcastPlayer from './components/CondensedPodcastPlayer';

function CondensedPlayer() {
  const type = useSelector(state => state.playerOverlay.type, shallowEqual);

  if (type === PLAYER_OVERLAY_TYPE.LIVE_STREAM || type === PLAYER_OVERLAY_TYPE.LIVE_SHOW) {
    return <CondensedLivePlayer type={type} />;
  }
  return <CondensedPodcastPlayer />;
}

export default CondensedPlayer;
