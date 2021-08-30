import * as player from 'components/Player/AudioPlayer/player';
import * as liveStreamPlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import isEmpty from 'lodash/isEmpty';
import PropTypes, { oneOf } from 'prop-types';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import PlayButtonUI from './components/PlayButtonUI';
import { PLAYER_OVERLAY_TYPE } from '../../../utilities/constants';

function PlayButton({ variant, analyticsData }) {
  const isStreaming = useSelector(state => state.liveStreamPlayer.playing, shallowEqual);
  const streamingUrl = useSelector(state => state.liveStreamPlayer.sourceUrl, shallowEqual);
  const liveShowIsLive = useSelector(state => state.liveShow.isLive, shallowEqual);
  const audioUrl = useSelector(state => state.audioPlayer.sourceUrl, shallowEqual);
  const isPlaying = useSelector(state => state.audioPlayer.playing, shallowEqual);
  const isLoading = useSelector(state => state.liveStreamPlayer.loading || state.audioPlayer.loading, shallowEqual);
  const playerType = useSelector(state => state.playerOverlay.type, shallowEqual);

  const handlePlayButtonOnClick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      player.tryPause();
      addToDataLayer({
        event: gtm.playerPause,
        ...analyticsData,
      });
      return;
    }
    if (isStreaming) {
      if (playerType === PLAYER_OVERLAY_TYPE.LIVE_SHOW) {
        if (liveShowIsLive) {
          liveStreamPlayer.tryPause();
          addToDataLayer({
            event: gtm.livePlayerPause,
            ...analyticsData,
          });
        }
      } else {
        liveStreamPlayer.tryPause();
        addToDataLayer({
          event: gtm.playerPause,
          ...analyticsData,
        });
      }

      return;
    }

    if (!isPlaying && !isEmpty(audioUrl)) {
      player.tryPlay();
      addToDataLayer({
        event: gtm.playerPlay,
        ...analyticsData,
      });
      return;
    }

    if (!isStreaming && !isEmpty(streamingUrl)) {
      if (playerType === PLAYER_OVERLAY_TYPE.LIVE_SHOW) {
        if (liveShowIsLive) {
          liveStreamPlayer.tryPlay();
          addToDataLayer({
            event: gtm.livePlayerPlay,
            ...analyticsData,
          });
        }
      } else {
        liveStreamPlayer.tryPlay();
        addToDataLayer({
          event: gtm.playerPlay,
          ...analyticsData,
        });
      }
    }
  };

  return (
    <PlayButtonUI
      isStreaming={isStreaming}
      isPlaying={isPlaying}
      isLoading={isLoading}
      variant={variant}
      onClick={handlePlayButtonOnClick}
    />
  );
}

PlayButton.propTypes = {
  variant: oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
  analyticsData: PropTypes.shape({
    showName: PropTypes.string,
    showCategory: PropTypes.string,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    streamingUrl: PropTypes.string,
  }),
};

PlayButton.defaultProps = {
  analyticsData: null,
};

export default PlayButton;
