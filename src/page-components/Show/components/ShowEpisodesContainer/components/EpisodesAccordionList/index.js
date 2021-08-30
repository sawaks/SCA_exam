import { Box } from '@rebass/grid';
import Accordion from 'components/Accordion';
import EpisodeCard from 'components/Card/EpisodeCard';
import EpisodeLoading from 'components/Card/EpisodeCard/EpisodeLoading';
import { Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { bool, string, func } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { EPISODE_ORIGIN } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const StyledEpisodesList = styled.span`
  width: inherit;
`;

const StyledTracks = styled.div`
  width: inherit;
`;

const TitleComponent = season => (
  <Header
    as="h2"
    variant="m"
    text={season === 0 ? 'Episodes' : `Season ${season}`}
  />
);

function EpisodesAccordionList({
  listedSeason,
  origin,
  showId,
  slug,
  sortOrder,
  openAccordionIndex,
  openCallback,
  categories,
  isPlaylistPage,
  isEpisodePage,
  isShowPage,
  contentType,
  showImages,
  isLocal,
}) {
  return listedSeason.map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <StyledEpisodesList key={`${openAccordionIndex}-${index}-${sortOrder}`}>
      <Box width="100%">
        <Accordion
          id={`${index}-${sortOrder}`}
          TitleComponent={TitleComponent(item.season)}
          isOpen={index === openAccordionIndex}
          showExpansion={item.total > 6}
          openCallback={() => openCallback(item.episodes, item.season)}
        >
          <StyledTracks>
            <>
              {isEmpty(item.episodes) && <EpisodeLoading count={3} />}
              {item.episodes
                && item.episodes.map((element, i) => (
                  <Flex
                    flexDirection="column"
                    alignItems="flex-start"
                    my={spacing.m}
                    key={`${element.id}`}
                  >
                    <EpisodeCard
                      cardWidth="100%"
                      currentTimeSeconds={element.time}
                      data-test={`show-episode-${i}`}
                      description={element.description}
                      durationSeconds={element.durationSeconds}
                      episode={element.episode}
                      episodeId={element.id}
                      episodeSlug={element.slug}
                      showImageUrl={showImages.squareMedium.url}
                      isLocal={isLocal}
                      imageUrl={element.imageUrl}
                      index={i}
                      isEpisodeNew={element.isNewEpisode}
                      isExplicit={element.contentRating === 'Explicit'}
                      isPlaylistPage={isPlaylistPage}
                      isEpisodePage={isEpisodePage}
                      isShowPage={isShowPage}
                      noBorder
                      noMargins
                      onGtmClick={() => addToDataLayer({
                        event: gtm.onPlayerEpisodesListingTrackClick,
                        contentType,
                        episodeId: element.id,
                        episodeTitle: element.title,
                        episodeIndex: i,
                        podcastName: element?.show?.name,
                        podcastCategory: get(categories, '[0].name', ''),
                      })
                      }
                      origin={origin}
                      publishedDate={element.publishedUtc}
                      season={element.season}
                      showId={showId}
                      showSlug={slug}
                      title={element.title}
                      variant="long"
                    />
                  </Flex>
                ))}
            </>
          </StyledTracks>
        </Accordion>
      </Box>
    </StyledEpisodesList>
  ));
}

EpisodesAccordionList.propTypes = {
  origin: string,
  isShowPage: bool,
  isPlaylistPage: bool,
  isEpisodePage: bool,
  openCallback: func.isRequired,
  contentType: string,
};

EpisodesAccordionList.defaultProps = {
  origin: EPISODE_ORIGIN.default,
  isShowPage: false,
  isPlaylistPage: false,
  isEpisodePage: false,
  contentType: '',
};

export default EpisodesAccordionList;
