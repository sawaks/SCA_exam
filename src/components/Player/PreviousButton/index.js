import PropTypes from 'prop-types';
import React from 'react';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { handlePreviousEpisode } from 'store/actions/active-playlist';
import { CONTENT_TYPE } from 'utilities/constants';
import { addOrUpdateEpisode } from 'store/actions/listened-episodes';
import * as player from '../AudioPlayer/player';
import PreviousButtonUI from './PreviousButtonUI';

function PreviousButton({ music, analyticsData }) {
  const dispatch = useDispatch();
  const contentType = useSelector(state => state.episode?.show?.contentType, shallowEqual);
  const currentTime = useSelector(state => state.audioPlayer.currentTime, shallowEqual);
  const listenedEpisodes = useSelector(state => state.userSessionInfo.listenedEpisodes, shallowEqual);
  const { userId } = useSelector(({ profile }) => ({ userId: profile.userId }), shallowEqual);
  const episodeData = useSelector(({ episode }) => ({
    id: episode?.id,
    slug: episode?.slug,
    season: episode?.season,
    durationSeconds: episode?.durationSeconds,
    showId: episode?.show?.id,
    showSlug: episode?.show?.slug,
    playheadPosition: currentTime,
    isMarkedAsPlayed: episode?.isMarkedAsPlayed }), shallowEqual);

  const enable = useSelector(({ episode, activePlaylist }) => {
    if (activePlaylist.episodesList) {
      const currentId = episode.id;
      const currentIndex = activePlaylist.episodesList.findIndex(indx => indx === currentId);
      return currentIndex !== 0 || (music && currentTime >= 30);
    }

    return !music;
  }, shallowEqual);

  const handlePrevious = async (e) => {
    e.stopPropagation();
    await dispatch(addOrUpdateEpisode(userId, episodeData));
    if (contentType !== CONTENT_TYPE.MUSIC || currentTime < 30) {
      // Ensure its not the first episode.
      if (enable) {
        dispatch(handlePreviousEpisode(listenedEpisodes));
        addToDataLayer({
          event: gtm.playerPreviousTrack,
          ...analyticsData,
        });
      }
      return;
    }

    player.setCurrentTime(0);
  };

  return (
    <PreviousButtonUI onClick={handlePrevious} enable={enable} />
  );
}

PreviousButton.propTypes = {
  music: PropTypes.bool,
  analyticsData: PropTypes.shape({
    showName: PropTypes.string,
    showCategory: PropTypes.string,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    streamingUrl: PropTypes.string,
  }),
};

PreviousButton.defaultProps = {
  music: false,
  analyticsData: null,
};

export default PreviousButton;
