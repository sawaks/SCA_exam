import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import { EPISODE_ORIGIN } from 'utilities/constants';
import EpisodeItem from '../EpisodeItem';

const StyledTracks = styled.div`
  width: inherit;
  padding-top: ${spacing.m};
`;

const StyledEpisodesList = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  width: inherit;
  padding-top: ${spacing.m};
  min-height: 115px;

  ${screen.md} {
    padding-top: 0;
    background: none;
    border: none;
  }
`;

const EpisodesListWrapper = styled.div`
  width: 100%;
  word-break: break-word;
`;

function EpisodesList({ episodesOrigin, sortedEpisodes, currentPlayingId, playlistSlug }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getIndex = sortedEpisodes.findIndex(item => item.id === currentPlayingId);
    setCurrentIndex(getIndex);
  }, [currentPlayingId]);

  return (
    <EpisodesListWrapper>
      <StyledTracks>
        <StyledEpisodesList>
          {sortedEpisodes.map((element, index) => {
            if (index > currentIndex && index < currentIndex + 6) {
              return (
                <div key={element.id}>
                  <EpisodeItem
                    item={element}
                    index={index}
                    time={element.time}
                    podcastName={element.show.name}
                    duration={element.durationSeconds}
                    isActive={currentPlayingId === element.id}
                    withDivider={index !== sortedEpisodes.length - 1}
                    isInMyPlaylist={element.inMyPlaylist}
                    origin={episodesOrigin}
                    showPlayButton
                    playlistSlug={playlistSlug}
                  />
                </div>
              );
            }
            return null;
          })}
        </StyledEpisodesList>
      </StyledTracks>
    </EpisodesListWrapper>
  );
}

EpisodesList.propTypes = {
  episodesOrigin: PropTypes.oneOf([EPISODE_ORIGIN.default, EPISODE_ORIGIN.myPlaylist, EPISODE_ORIGIN.curatedPlaylist, EPISODE_ORIGIN.topFeed, EPISODE_ORIGIN.bottomFeed]),
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
  ).isRequired,
  currentPlayingId: PropTypes.string.isRequired,
  playlistSlug: PropTypes.string,
};

EpisodesList.defaultProps = {
  episodesOrigin: EPISODE_ORIGIN.default,
  playlistSlug: '',
};

export default EpisodesList;
