import * as player from 'components/Player/AudioPlayer/player';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { CONTENT_TYPE } from 'utilities/constants';
import PlaybackRateButtonUI from './PlaybackRateButtonUI';

function PlaybackRateButton() {
  const disable = useSelector(state => state.episode?.show?.contentType === CONTENT_TYPE.MUSIC, shallowEqual);
  const isPlaying = useSelector(state => state.audioPlayer.isPlaying, shallowEqual);
  const isLoading = useSelector(state => state.audioPlayer.isLoading, shallowEqual);
  const playbackRate = useSelector(state => state.audioPlayer.playbackRate, shallowEqual);

  function handleOnClick(e) {
    e.stopPropagation();
    if (!disable) {
      player.changePlaybackRate();
    }
  }

  return (
    <PlaybackRateButtonUI
      isPlaying={isPlaying}
      isLoading={isLoading}
      onClick={handleOnClick}
      rate={playbackRate}
      disable={disable}
    />
  );
}

export default PlaybackRateButton;
