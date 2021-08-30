import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateActivePlaylist } from 'store/actions/active-playlist';
import { EPISODE_ORIGIN } from 'utilities/constants';
import EpisodesContainerUI from '../EpisodeContainerUI';

const FeedEpisodesContainer = ({ podcastId, episodesOrigin }) => {
  const dispatch = useDispatch();
  const [sortedEpisodes, setSortedEpisodes] = useState(null);

  const { currentPlayingId, topFeed, bottomFeed } = useSelector(({ episode, myFeed }) => ({
    currentPlayingId: episode?.id,
    topFeed: myFeed.podcasts?.top?.entries || [],
    bottomFeed: myFeed.podcasts?.bottom?.entries || [],
  }), shallowEqual);

  useEffect(() => {
    const episodes = episodesOrigin === EPISODE_ORIGIN.topFeed ? topFeed : bottomFeed;
    if (episodes) {
      const episodeIds = episodes.map(item => item.id);
      dispatch(updateActivePlaylist(episodeIds));
      setSortedEpisodes(episodes);
    }
  }, [episodesOrigin]);

  return (
    <EpisodesContainerUI
      episodesOrigin={episodesOrigin}
      sortedEpisodes={sortedEpisodes}
      currentPlayingId={currentPlayingId}
      podcastId={podcastId}
    />
  );
};

FeedEpisodesContainer.propTypes = {
  podcastId: PropTypes.string.isRequired,
  episodesOrigin: PropTypes.string.isRequired,
};

export default FeedEpisodesContainer;
