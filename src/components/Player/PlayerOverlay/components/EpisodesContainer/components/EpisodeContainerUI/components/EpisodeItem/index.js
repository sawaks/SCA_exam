import { Flex } from 'components/Grid';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { openPlayer } from 'store/actions/player-overlay';

import TrackItem from './components/TrackItem';

const TrackContainer = styled.button`
  appearance: none;
  border: 0;
  color: inherit;
  text-align: inherit;
  padding: 0 ${spacing.m};
  /* Can't use inherit as it does not work on IE11 */
  background: transparent;
  display: block;
  &:focus {
    outline: none;
  }
  width: 100%;
`;

function EpisodeItem({
  item,
  index,
  time,
  duration,
  podcastName,
  origin,
  playlistSlug,
  showComments,
}) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    addToDataLayer({
      event: (origin === 'myPlaylist') ? gtm.onPlayerEpisodesMyPlaylistTrackClick : gtm.podcastPlayEpisode,
      episodeId: item.id,
      episodeTitle: item.title,
      episodeIndex: index,
      show: podcastName,
      category: get(item, 'show.categories[0].name', ''),
    });

    dispatch(openPlayer({
      episodeId: item.id,
      episodePlayHeadPosition: time,
      episodeDuration: duration,
      episodeOrigin: origin,
      playlistSlug,
    }));
  };

  return (
    <Flex flexDirection="column" mb={spacing.m} className="non-drag">
      <TrackContainer key={item.id} onClick={handleOnClick}>
        <TrackItem
          item={item}
          time={time}
          podcastName={podcastName}
          duration={duration}
          showComments={showComments}
        />
      </TrackContainer>
    </Flex>
  );
}

EpisodeItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    publishedUtc: PropTypes.string,
    durationSeconds: PropTypes.number,
    episode: PropTypes.number,
    season: PropTypes.number,
    podcast: PropTypes.shape({
      name: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    }),
    show: PropTypes.shape({
      name: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  time: PropTypes.number,
  duration: PropTypes.number,
  origin: PropTypes.string.isRequired,
  playlistSlug: PropTypes.string,
  showComments: PropTypes.bool,
  podcastName: PropTypes.string,
};

EpisodeItem.defaultProps = {
  duration: 0,
  time: 0,
  playlistSlug: '',
  podcastName: null,
  showComments: false,
};

export default EpisodeItem;
