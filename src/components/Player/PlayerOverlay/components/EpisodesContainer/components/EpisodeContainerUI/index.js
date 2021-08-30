import { Flex } from 'components/Grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { EPISODE_ORIGIN } from 'utilities/constants';
import EpisodesList from './components/EpisodesList';
import EpisodesLoading from './components/EpisodesLoading';
import NoEpisodes from './components/NoEpisodes';

const EpisodesWrapper = styled(Flex)`
  position: relative;
  flex-grow: 1;
`;

const containerState = {
  LOADING: 'loading',
  NoMoreEpisodes: 'NoMoreEpisodes',
  DEFAULT: 'default',
};

function EpisodesContainerUI({
  sortedEpisodes,
  currentPlayingId,
  episodesOrigin,
  playlistSlug,
}) {
  const [state, setState] = useState(containerState.LOADING);
  useEffect(() => {
    if (!sortedEpisodes) {
      return setState(containerState.LOADING);
    }
    // Check if its the last episode
    if (sortedEpisodes.findIndex(item => item.id === currentPlayingId) === (sortedEpisodes.length - 1)) {
      return setState(containerState.NoMoreEpisodes);
    }
    return setState(containerState.DEFAULT);
  }, [sortedEpisodes, currentPlayingId]);

  if (state === containerState.LOADING) {
    return (
      <EpisodesWrapper flexDirection="column" justifyContent="flex-end" mt={['0', '6px']}>
        <EpisodesLoading count={3} />
      </EpisodesWrapper>
    );
  }

  if (state === containerState.NoMoreEpisodes) {
    return (
      <EpisodesWrapper flexDirection="column" justifyContent="start" mt={['0', '6px']}>
        <NoEpisodes type={playlistSlug ? 'playlist' : 'show'} />
      </EpisodesWrapper>
    );
  }

  return (
    <EpisodesWrapper flexDirection="column" justifyContent="flex-end" mt={['0', '6px']}>
      <EpisodesList
        sortedEpisodes={sortedEpisodes}
        currentPlayingId={currentPlayingId}
        episodesOrigin={episodesOrigin}
        playlistSlug={playlistSlug}
      />
    </EpisodesWrapper>
  );
}

EpisodesContainerUI.propTypes = {
  sortedEpisodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
      duration: PropTypes.number,
      published: PropTypes.string,
      audioUrl: PropTypes.string,
      publishedUtc: PropTypes.string,
      playheadPosition: PropTypes.number,
    }),
  ),
  playlistSlug: PropTypes.string,
  currentPlayingId: PropTypes.string,
  episodesOrigin: PropTypes.oneOf([EPISODE_ORIGIN.default, EPISODE_ORIGIN.myPlaylist, EPISODE_ORIGIN.curatedPlaylist, EPISODE_ORIGIN.topFeed, EPISODE_ORIGIN.bottomFeed]),
};
EpisodesContainerUI.defaultProps = {
  episodesOrigin: EPISODE_ORIGIN.default,
  currentPlayingId: null,
  sortedEpisodes: null,
  playlistSlug: null,
};

export default EpisodesContainerUI;
