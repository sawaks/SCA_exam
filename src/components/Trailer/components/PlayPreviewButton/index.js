import browserDetect from 'browser-detect';
import * as trailerController from 'components/Trailer/player/trailerController';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import addToDataLayer from 'utilities/helpers/dataLayer';

import PlayPreviewUI from './PlayPreviewUI';

function PlayPreviewButton({ btnText, ...props }) {
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const browser = browserDetect(window.navigator.userAgent);
    if (browser.mobile) {
      setIsMobile(true);
    }
  }, []);

  const trailerPlayer = useSelector(state => state.trailerPlayer, shallowEqual);

  const getProgress = (currentTime, duration) => {
    if (!playing) return 0;
    if (!currentTime) {
      return 0;
    }
    if (currentTime === duration) {
      setPlaying(false);
      return 0;
    }
    return (currentTime / duration) * 100;
  };

  const handlePlayClick = (e) => {
    addToDataLayer({
      event: gtm.onBrowsePageHeroPreviews,
      pageType: page.browsePage,
    });
    e.preventDefault();
    const { audioUrl } = props;
    setPlaying(true);
    trailerController.updateSource(audioUrl);
  };

  const handleStopClick = (e) => {
    e.preventDefault();
    setPlaying(false);
    trailerController.tryPause();
  };

  const getText = () => {
    if (isMobile) return 'Preview';
    return 'Play Preview';
  };

  useEffect(() => {
    if (props.audioUrl !== trailerPlayer.sourceUrl) {
      setPlaying(false);
      trailerController.tryPause();
    }
  }, [trailerPlayer.sourceUrl]);

  return (
    <PlayPreviewUI
      {...props}
      text={getText()}
      progress={getProgress(trailerPlayer.currentTime, trailerPlayer.duration)}
      playing={playing}
      onPlayClick={handlePlayClick}
      onStopClick={handleStopClick}
    />
  );
}

PlayPreviewButton.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  minWidthMobile: PropTypes.string,
  maxWidthMobile: PropTypes.string,
  minWidthDesktop: PropTypes.string,
  maxWidthDesktop: PropTypes.string,
  btnText: PropTypes.string,
};

PlayPreviewButton.defaultProps = {
  minWidthMobile: null,
  maxWidthMobile: null,
  minWidthDesktop: null,
  maxWidthDesktop: null,
  btnText: 'Play Preview',
};

export default PlayPreviewButton;
