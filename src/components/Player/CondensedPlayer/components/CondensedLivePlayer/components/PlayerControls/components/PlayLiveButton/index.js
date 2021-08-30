import * as livePlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import gtm from 'utilities/GTM/gtmTags';
import React from 'react';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { shallowEqual, useSelector } from 'react-redux';
import PlayButtonUI from '../PlayControlsUI/PlayButtonUI';

function PlayButton() {
  const { isPlaying, isLoading } = useSelector(({ liveStreamPlayer }) => ({
    isPlaying: liveStreamPlayer.playing,
    isLoading: liveStreamPlayer.loading,
  }), isEqual);

  // Retrieve station data for analytics
  const { analyticsData } = useSelector(({ station }) => {
    const data = {
      pageType: 'station',
      stationName: get(station, 'name', null),
      stationCode: get(station, 'stationCode', null),
      stationType: get(station, 'stationType', null),
      network: get(station, 'network', null),
      state: get(station, 'state', null),
    };
    return {
      analyticsData: data,
    };
  }, shallowEqual);

  const handlePlayButtonOnClick = (e) => {
    e.stopPropagation();

    if (isPlaying) {
      livePlayer.tryPause();
      addToDataLayer({
        event: gtm.playerPause,
        ...analyticsData,
      });
    } else {
      livePlayer.tryPlay();
      addToDataLayer({
        event: gtm.playerPlay,
        ...analyticsData,
      });
    }
  };

  return (
    <PlayButtonUI
      isPlaying={isPlaying}
      isLoading={isLoading}
      onClick={handlePlayButtonOnClick}
    />
  );
}

export default PlayButton;
