import EpisodeCard from 'components/Card/EpisodeCard';
import PropTypes from 'prop-types';
import React from 'react';
import Divider from 'components/Divider';
import { Box, Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import spacing from 'styles/helpers/spacing';
import { EPISODE_ORIGIN } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const EpisodeList = ({ episodes, currentPlayingId, name, playerVisible, playlistSlug, isPlaylistPage, isShowPage, origin, categories }) => (
  <>
    <Header as="h2" variant="m" text={episodes && episodes.length > 1 ? ` ${episodes.length} Episodes` : 'Episode'} />
    <Box my={spacing.l}>
      <Divider />
    </Box>
    {episodes.map((item, i) => (
      <Flex flexDirection="column" alignItems="flex-start" my={spacing.m} key={`${item.id}`}>
        <EpisodeCard
          cardWidth="100%"
          currentTimeSeconds={item.time}
          data-test={`show-episode-${i}`}
          description={item.description}
          durationSeconds={item.durationSeconds}
          episode={item.episode}
          episodeId={item.id}
          imageUrl={item.imageUrl}
          isActive={currentPlayingId === item.id}
          isEpisodeNew={item.isNewEpisode}
          isExplicit={item.contentRating === 'Explicit'}
          isCompleted={item.isCompleted}
          isPlaylistPage={isPlaylistPage}
          isShowPage={isShowPage}
          noBorder
          noMargins
          onGtmClick={() => addToDataLayer({
            event: isPlaylistPage ? gtm.onPlayerEpisodesMyPlaylistTrackClick : gtm.podcastPlayEpisode,
            episodeId: item.id,
            episodeTitle: item.title,
            episodeIndex: i,
            show: name,
            ...(!isPlaylistPage && { category: categories?.length > 0 ? categories[0]?.name : '' }),
          })}
          origin={origin}
          playlistSlug={playlistSlug}
          playerVisible={playerVisible}
          publishedDate={item.publishedUtc}
          season={item.season}
          showSlug={item?.show?.slug}
          title={item.title}
          variant="long"
        />
      </Flex>
    )
    )}
  </>
);

EpisodeList.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
    ])
  ).isRequired,
  name: PropTypes.string,
  currentPlayingId: PropTypes.string,
  browser: PropTypes.shape({ mobile: PropTypes.bool }).isRequired,
  playerVisible: PropTypes.bool,
  isPlaylistPage: PropTypes.bool,
  isShowPage: PropTypes.bool,
  playlistSlug: PropTypes.string,
  origin: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
};

EpisodeList.defaultProps = {
  currentPlayingId: null,
  name: '',
  playerVisible: false,
  isPlaylistPage: false,
  isShowPage: true,
  playlistSlug: '',
  origin: EPISODE_ORIGIN.default,
  categories: [],
};

export default EpisodeList;
