import React from 'react';
import PropTypes from 'prop-types';
import { EPISODE_ORIGIN } from 'utilities/constants';
import CuratedEpisodesContainer from './components/CuratedEpisodesContainer';
import FeedEpisodesContainer from './components/FeedEpisodesContainer';
import ShowEpisodesContainer from './components/ShowEpisodesContainer';

function EpisodesContainer(props) {
  const { episodesOrigin } = props;
  if (episodesOrigin === EPISODE_ORIGIN.curatedPlaylist) {
    return <CuratedEpisodesContainer {...props} />;
  }
  if (episodesOrigin === EPISODE_ORIGIN.topFeed || episodesOrigin === EPISODE_ORIGIN.bottomFeed) {
    return <FeedEpisodesContainer {...props} />;
  }
  return <ShowEpisodesContainer {...props} />;
}

EpisodesContainer.propTypes = {
  episodesOrigin: PropTypes.string.isRequired,
};

export default EpisodesContainer;
