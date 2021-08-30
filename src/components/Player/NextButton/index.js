import React from 'react';
import PropTypes from 'prop-types';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { handleNextEpisode } from 'store/actions/active-playlist';
import { useDispatch, useSelector, shallowEqual, connect } from 'react-redux';
import { addOrUpdateEpisode } from 'store/actions/listened-episodes';
import NextButtonUI from './NextButtonUI';

function NextButton({ analyticsData, currentTime }) {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ profile }) => ({ userId: profile.userId }), shallowEqual);
  const listenedEpisodes = useSelector(state => state.userSessionInfo.listenedEpisodes, shallowEqual);
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
    const episodesList = activePlaylist?.episodesList;
    const currentId = episode?.id;
    const index = episodesList.findIndex(indx => indx === currentId);
    return index < episodesList.length - 1;
  });

  const handleNext = async (e) => {
    e.stopPropagation();
    await dispatch(addOrUpdateEpisode(userId, episodeData));
    const getNextEpisode = await dispatch(handleNextEpisode(listenedEpisodes));

    if (getNextEpisode) {
      addToDataLayer({
        event: gtm.playerNextTrack,
        ...analyticsData,
      });
    }
  };

  return (
    <NextButtonUI onClick={handleNext} disable={!enable} />
  );
}

NextButton.propTypes = {
  analyticsData: PropTypes.shape({
    showName: PropTypes.string,
    showCategory: PropTypes.string,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    contentTyoe: PropTypes.string,
    streamingUrl: PropTypes.string,
  }).isRequired,
  currentTime: PropTypes.number,
};

NextButton.defaultProps = {
  currentTime: 0,
};

function mapStateToProps({ audioPlayer }) {
  return {
    currentTime: audioPlayer.currentTime,
  };
}

export default connect(mapStateToProps)(NextButton);
