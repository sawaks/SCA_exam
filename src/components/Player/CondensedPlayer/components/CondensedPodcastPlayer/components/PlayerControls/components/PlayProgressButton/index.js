import React from 'react';
import { func } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import * as player from 'components/Player/AudioPlayer/player';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import PlayProgressButtonUI from './PlayProgressButtonUI';

function PlayProgressButton({ onClickCallback }) {
  const { isPlaying, isLoading, currentTime, duration } = useSelector(({ audioPlayer }) => ({
    isPlaying: audioPlayer.playing,
    isLoading: audioPlayer.loading,
    currentTime: audioPlayer.currentTime,
    duration: audioPlayer.duration,
  }), isEqual);

  // Retrieve episode data for analytics
  const { analyticsData } = useSelector(({ episode }) => {
    const showCategories = get(episode, 'show.categories', null);
    const getFirstCategory = showCategories ? showCategories[0] : null;
    const getFirstCategoryName = get(getFirstCategory, 'name', null);
    const data = {
      showName: get(episode, 'show.name', null),
      showCategory: getFirstCategoryName,
      season: get(episode, 'season', null),
      episodeNumber: get(episode, 'episode', null),
      contentType: get(episode, 'show.contentType', null),
      streamingUrl: get(episode, 'audioUrl', null),
    };
    return {
      analyticsData: data,
    };
  }, shallowEqual);

  const handlePlayButtonOnClick = (e) => {
    e.stopPropagation();

    if (onClickCallback) {
      onClickCallback();
    }
    if (isPlaying) {
      player.tryPause();
      addToDataLayer({
        event: gtm.playerPause,
        ...analyticsData,
      });
    } else {
      player.tryPlay();
      addToDataLayer({
        event: gtm.playerPlay,
        ...analyticsData,
      });
    }
  };

  const getProgress = () => {
    if (!currentTime) {
      return 0;
    }
    if (currentTime === 0 || Math.trunc(currentTime) === Math.trunc(duration)) {
      return 0;
    }
    return (currentTime / duration) * 100;
  };

  return (
    <PlayProgressButtonUI
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={getProgress()}
      onClick={handlePlayButtonOnClick}
    />
  );
}

PlayProgressButton.propTypes = {
  onClickCallback: func,
};

PlayProgressButton.defaultProps = {
  onClickCallback: () => {},
};

export default PlayProgressButton;
