import AppBanner from 'components/AppBanner';
import { Box, Container, Flex } from 'components/Grid';
import FullWidthSection from 'components/Layout/FullWidthSection';
import Page from 'components/Layout/Page';
import Head from 'next/head';
import Section from 'components/Section';
import { useRouter } from 'next/router';
import { arrayOf, shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteStation, deleteFavouriteStation, updateFavouriteStation } from 'store/actions/favourite';
import { subscribeSingle, unSubscribeSingle } from 'store/actions/now-playing';
import { openLiveStreamPlayer } from 'store/actions/player-overlay';
import { displaySignupModal } from 'store/actions/userInteractions';
import spacing from 'styles/helpers/spacing';
import nameRoutes from 'common/named-routes';
import useRouterServer from 'utilities/helpers/useRouterServer';
import BackgroundImage from './components/BackgroundImage';
import NowPlaying from './components/NowPlaying';
import StationInfoContainer from './components/StationInfoContainer';
import StationPodcastCarousels from './components/StationPodcastCarousels';

const Station = ({ station, downloadAppBanner }) => {
  const { slug, backgroundColour, name, images = {}, description = '', audioStreams = [], genres, shows = [], stationShows = [], relatedStations = [] } = station || {};
  const { logoLarge } = images;
  const dispatch = useDispatch();
  const router = useRouter();
  const stationCategories = genres?.map(genre => genre.slug.replace(/-/g, ''));
  const callSign = audioStreams?.[0]?.callSign;
  const nowPlayingData = useSelector(state => state.nowPlaying);
  const playerStation = useSelector(state => state.station?.audioStreams?.[0]?.callSign);
  const userId = useSelector(state => state.profile.userId);
  const favouriteStations = useSelector(state => state.userSessionInfo.favouriteStations);
  const liveStreamPlaying = useSelector(state => state.liveStreamPlayer?.playing);
  const [nowPlaying, setNowPlaying] = useState();

  const playerClick = () => {
    dispatch(openLiveStreamPlayer(slug));
  };

  const isFavouriteStation = useSelector((state) => {
    const stationObj = state.userSessionInfo.favouriteStations;
    return !!stationObj[slug];
  });

  const handleAddFavStation = () => {
    if (userId) {
      if (name) {
        window.scaGtmDataLayer.push({
          event: 'onKruxChanged',
          favourited_station: name,
          kxsegment: window.Krux ? window.Krux.segments : null,
        });
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
      return dispatch(addFavouriteStation(userId, { slug, name }));
    }
    return dispatch(displaySignupModal());
  };

  const handleRemoveFavStation = () => {
    if (userId) {
      return dispatch(deleteFavouriteStation(userId, slug));
    }
    return dispatch(displaySignupModal());
  };

  useEffect(() => {
    dispatch(subscribeSingle(callSign));
    return () => dispatch(unSubscribeSingle(callSign, true));
  }, [router.query.station]);

  useEffect(() => {
    setNowPlaying(nowPlayingData[callSign?.toLowerCase()]);
  }, [nowPlayingData]);

  useEffect(() => {
    if (userId) {
      if (favouriteStations[slug]) {
        dispatch(updateFavouriteStation(userId, slug));
      }
    }
    if (userId && router?.pathname === '/stations/[station]/live/player') {
      dispatch(openLiveStreamPlayer(slug));
    }
  }, [userId]);

  if (!station) {
    useRouterServer(nameRoutes.external.error404);
    return null;
  }

  return (
    <Page withNavDesktopOnly withAudio withNav withFooter fullWidthBg={BackgroundImage} backgroundImage={images?.stationBackgroundSmall} backgroundColor={station?.backgroundColour}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={images?.share} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={images?.share} />
      </Head>
      <Container>
        <Section>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 0.4]}>
              <StationInfoContainer
                stationName={name}
                logo={logoLarge}
                backgroundColour={backgroundColour}
                stationCategories={stationCategories}
                description={description}
                isFavouriteStation={isFavouriteStation}
                addFavouriteStation={handleAddFavStation}
                removeFavouriteStation={handleRemoveFavStation}
              />
            </Box>
            <Box width={[1, 1, 0.6]} pt={[spacing.l, spacing.l, 0]} pl={[0]}>
              <NowPlaying
                isPlaying={(playerStation?.toLowerCase() === callSign.toLowerCase()) && liveStreamPlaying}
                bgColour={backgroundColour}
                currentTrack={nowPlaying?.currentTrack}
                stationName={name}
                openPlayer={playerClick}
                dataTest="now-playing"
              />
              {/* Related stations carousel */}
              { relatedStations?.length > 0
              && (
              <Flex flexDirection="column">
                <StationPodcastCarousels
                  carouselType="station"
                  title="More stations from this network"
                  shows={relatedStations}
                  dataTest="related-stations"
                />
              </Flex>
              )
              }
              {/* podcast stations carousel */}
              { stationShows?.length > 0
              && (
              <Flex flexDirection="column">
                <StationPodcastCarousels
                  title="Podcasts from this station"
                  shows={stationShows}
                  dataTest="network-podcasts"
                />
              </Flex>
              )
              }
              {/* more podcasts carousel */}
              { shows?.length > 0
              && (
                <Flex flexDirection="column">
                  <StationPodcastCarousels
                    title="More podcasts to check out"
                    shows={shows}
                    dataTest="related-podcasts"
                  />
                </Flex>
              )
              }
            </Box>
          </Flex>
        </Section>
      </Container>
      <FullWidthSection fullWidth>
        <AppBanner
          title={downloadAppBanner.title}
          description={downloadAppBanner.description}
          backgroundImageUrl={downloadAppBanner.backgroundImageUrl}
        />
      </FullWidthSection>
    </Page>
  );
};

Station.propTypes = {
  station: shape({
    name: string.isRequired,
    backgroundColour: string.isRequired,
    images: shape({
      logoLarge: string.isRequired,
    }),
    audioStreams: arrayOf(
      shape({
        callSign: string.isRequired,
        url: string.isRequired,
      })
    ),
    shows: arrayOf(
      shape({
        name: string,
        slug: string,
        description: string,
        colourDark: string,
        images: shape({
          squareLarge: shape({
            url: string,
          }),
        }),
      })
    ),
    stationShows: arrayOf(
      shape({
        name: string,
        slug: string,
        description: string,
        colourDark: string,
        images: shape({
          squareLarge: shape({
            url: string,
          }),
        }),
      })
    ),
    relatedStations: arrayOf(
      shape({
        name: string,
        slug: string,
        description: string,
        backgroundColour: string,
        images: shape({
          logo: string,
        }),
      })
    ),
  }).isRequired,
  downloadAppBanner: shape({
    title: string,
    description: string,
    backgroundImageUrl: string,
  }).isRequired,
};

export default Station;
