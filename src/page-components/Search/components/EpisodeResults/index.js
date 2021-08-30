import EpisodeCard from 'components/Card/EpisodeCard';
import Divider from 'components/Divider';
import Section from 'components/Section';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { Box, Flex } from 'components/Grid';

const EpisodeResults = ({ episodes }) => {
  const audioPlayer = useSelector(state => state.audioPlayer, shallowEqual);
  const getProgress = (currentTime, duration) => {
    if (!currentTime) {
      return 0;
    }
    if (currentTime === 0 || Math.trunc(currentTime) === Math.trunc(duration)) {
      return 0;
    }
    return (currentTime / duration) * 100;
  };
  return (
    <>
      <Section>
        <HeaderWrapper>
          <Header as="h2" marginBottom="l">
            Episodes
          </Header>
        </HeaderWrapper>
        <DivWrapper>
          <Divider />
        </DivWrapper>
        <Flex flexWrap="wrap">
          {episodes.map((episode, index) => (
            <Box key={episode.id} width={[1, 1 / 2, 1 / 2, 1 / 3]}>
              <EpisodeCard
                noBorder
                episodeId={episode.id}
                title={episode.title}
                description={episode.description}
                imageUrl={episode.imageUrl}
                isNew={false}
                isExplicit={episode.contentRating === 'Explicit'}
                durationSeconds={episode.durationSeconds}
                episode={episode.episode}
                season={episode.season}
                publishedDate={episode.publishedUtc}
                percentage={getProgress(audioPlayer.currentTime, audioPlayer.duration)}
                playing={episode.audioUrl === audioPlayer.sourceUrl && audioPlayer.playing}
                showSlug={episode.show.slug}
                isShowPage
                onGtmClick={() => addToDataLayer({
                  event: gtm.searchResultsEpisodeClick,
                  episodeId: episode.id,
                  episodeTitle: episode.title,
                  episodeIndex: index,
                  podcastName: episode.name,
                })}
              />
            </Box>
          ))}
        </Flex>
      </Section>
    </>
  );
};

const HeaderWrapper = styled.div`
  margin: ${spacing.l} 0 ${spacing.m} 0;
  ${screen.md} {
    margin: ${spacing.xl} 0 ${spacing.m} 0;
  }
`;

const DivWrapper = styled.div`
  margin: ${spacing.m} 0;
`;

EpisodeResults.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EpisodeResults;

