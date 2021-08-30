import React, { useEffect } from 'react';
import { Box, Flex } from '@rebass/grid';
import { Container } from 'components/Grid';
import Page from 'components/Layout/Page';
import { Mobile } from 'components/Screen';
import Section from 'components/Section';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { audioUpdateLoading } from 'store/actions/audio-player';
import { updateCurrentEpisode } from 'store/actions/episode';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import { displaySignupModal } from 'store/actions/userInteractions';
import { EPISODE_ORIGIN } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import DownloadBanner from 'components/DownloadBanner';
import nameRoutes from 'common/named-routes';
import useRouterServer from 'utilities/helpers/useRouterServer';
import spacing from '../../styles/helpers/spacing';
import BackgroundImage from './components/BackgroundImage';
import PlaylistEpisodesContainer from './components/PlaylistEpisodesContainer';
import ShowEpisodesContainer from './components/ShowEpisodesContainer';
import Head from './components/Head';
import NotFound from './components/NotFound';
import RelatedPodcasts from './components/RelatedPodcasts';
import RelatedShows from './components/RelatedShows';
import ShowContainer from './components/ShowContainer';
import { getPlaylists, getShow } from '../../utilities/api/graphql/shows/queryMethods';
import { getEpisodeAndShowBySeason, getEpisodesBySeasons, getSeasonFromEpisodeSlug } from '../../utilities/api/graphql/episodes/queryMethods';
import LiveShow from './components/LiveShow';

function Show(props) {
  const dispatch = useDispatch();
  const { showContents, targetEpisode, isEpisodePage, isShowPage, isPlaylistPage, episodeCount } = props;

  const {
    creators,
    categories,
    relatedShows,
    playlistSlug,
    liveShowInfo,
    audioStreams,
  } = showContents || {};

  const origin = isPlaylistPage ? EPISODE_ORIGIN.curatedPlaylist : EPISODE_ORIGIN.default;
  const userId = useSelector(({ profile }) => (profile.userId), shallowEqual);
  const fetchProfileCompleted = useSelector(({ profile }) => (get(profile, 'inProgress', null) === false), shallowEqual);

  useEffect(() => {
    if (isEpisodePage) {
      addToDataLayer({
        event: gtm.onPageLoad,
        pageType: page.playerOverlay,
      });
    } else {
      addToDataLayer({
        event: gtm.onPageLoad,
        pageType: isPlaylistPage ? page.playlistPage : page.showPage,
      });
    }
  }, []);

  useEffect(() => {
    if (isEpisodePage && fetchProfileCompleted) {
      const { id: episodeId } = targetEpisode;
      const playheadPosition = 0;
      if (!userId) {
        dispatch(displaySignupModal());
      } else {
        dispatch(updateCurrentEpisode(episodeId, playheadPosition, playlistSlug, origin));
        dispatch(audioUpdateLoading(true));
        dispatch(playerOverlayUpdateVisible(true));
      }
    }
  }, [isEpisodePage, fetchProfileCompleted]);

  if (isEmpty(showContents) === 0) {
    // show the podcast not found component here
    return (<NotFound />);
  }

  if (!showContents) {
    useRouterServer(nameRoutes.external.error404);
    return null;
  }

  const fullWidthBg = BackgroundImage;

  return (
    <Page withNav withAudio withNavDesktopOnly withFooter fullWidthBg={fullWidthBg} {...props}>
      <Container>
        <Head
          isPlaylistPage={isPlaylistPage}
          isEpisodePage={isEpisodePage}
          isShowPage={isShowPage}
          showContents={showContents}
          targetEpisode={targetEpisode}
        />
        <Section>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 0.425]}>
              <ShowContainer
                showContents={showContents}
                condenseVersion={isShowPage}
                episodeCount={episodeCount}
              />
            </Box>
            <Box width={[1, 1, 0.575]} pt={[spacing.l, spacing.l, 0]} pl={[0]}>
              {isPlaylistPage && (
              <PlaylistEpisodesContainer
                origin={origin}
                playlistContents={showContents}
                isShowPage={isShowPage}
                isPlaylistPage={isPlaylistPage}
              />
              )}
              <>
                {(liveShowInfo && audioStreams && audioStreams.length > 0) && (
                  <LiveShow
                    showInfo={liveShowInfo}
                    audioStreams={audioStreams}
                    showContents={showContents}
                  />
                )}
                {(isShowPage || isEpisodePage) && (
                  <ShowEpisodesContainer
                    dropdownButtonId="filter-podcast-show-desktop"
                    origin={origin}
                    showContents={showContents}
                    isShowPage={isShowPage}
                    isPlaylistPage={isPlaylistPage}
                    isEpisodePage={isEpisodePage}
                    playerBgImage={showContents?.images?.background?.url}
                  />
                )}
              </>
            </Box>
          </Flex>
        </Section>
        {isShowPage && (
          <>
            <DownloadBanner />
            <RelatedPodcasts podcasts={relatedShows} />
            <Mobile>
              <RelatedShows
                creators={creators}
                categories={categories}
              />
            </Mobile>
          </>
        )}
      </Container>
    </Page>
  );
}

Show.getInitialProps = async ({ query }) => {
  const episodeSlug = get(query, 'episode', null);
  const playlistSlug = get(query, 'playlist', null);
  const showSlug = get(query, 'show', null).toLowerCase();

  // Episode Page
  if (showSlug && episodeSlug) {
    const getSeason = get(await getSeasonFromEpisodeSlug(episodeSlug), 'episode.season', null);
    const showContents = get(await getEpisodeAndShowBySeason(showSlug, getSeason), 'show', null);
    const episodes = get(showContents, 'episodes.items', null);
    const targetEpisode = episodes?.length > 0 && episodes.find(item => item.slug === `${episodeSlug}`);

    if (showContents) {
      showContents.seasons = showContents.seasons.map((item) => {
        if (item.season === getSeason) {
          return { ...item, episodes };
        }
        return item;
      });
    }

    return {
      showContents,
      targetEpisode,
      isEpisodePage: true,
      isPlaylistPage: false,
      isShowPage: false,
    };
  }

  // Curated Playlist
  if (playlistSlug) {
    const playlistData = get(await getPlaylists(playlistSlug), 'playlist', null);
    const showContents = {
      ...playlistData,
      episodes: [...playlistData.episodes],
    };

    return {
      showContents,
      isEpisodePage: false,
      isPlaylistPage: true,
      isShowPage: false,
    };
  }

  // Show Page
  const showContents = get(await getShow(showSlug), 'show', null);
  const firstSeason = get(showContents, 'seasons[0].season', null);
  const episodes = get(await getEpisodesBySeasons(showSlug, firstSeason), 'show.episodes.items', null);
  if (showContents) {
    showContents.seasons = showContents.seasons.map((item) => {
      if (item.season === firstSeason) {
        return { ...item, episodes };
      }
      return item;
    });
  }
  return {
    showContents,
    isEpisodePage: false,
    isPlaylistPage: false,
    isShowPage: true,
  };
};

Show.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  showContents: PropTypes.object.isRequired,
  episodeCount: PropTypes.number,
  targetEpisode: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
  }),
  isEpisodePage: PropTypes.bool,
  isShowPage: PropTypes.bool,
  isPlaylistPage: PropTypes.bool,
};

Show.defaultProps = {
  episodeCount: null,
  targetEpisode: {
    id: null,
    slug: null,
    imageUrl: null,
    description: null,
  },
  isEpisodePage: false,
  isShowPage: true,
  isPlaylistPage: false,
};

export default Show;
