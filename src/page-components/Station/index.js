import { Box, Container, Flex } from 'components/Grid';
import Page from 'components/Layout/Page';
import Head from 'next/head';
import Section from 'components/Section';
import { shape, string } from 'prop-types';
import React from 'react';
import spacing from 'styles/helpers/spacing';
import nameRoutes from 'common/named-routes';
import useRouterServer from 'utilities/helpers/useRouterServer';
import NowPlaying from './components/NowPlaying';
import StationInfoContainer from './components/StationInfoContainer';

const Station = ({ station }) => {
  const { backgroundColour, name, images = {}, description = '', genres } = station || {};
  const { logoLarge } = images;
  const stationCategories = genres?.map(genre => genre.slug.replace(/-/g, ''));

  if (!station) {
    useRouterServer(nameRoutes.external.error404);
    return null;
  }
  const currentTrack = {
    title: "Don't Stop Me Now",
    imageUrl: 'https://cdn-nowplaying-listnr-prod.scalabs.com.au/img/79f0979b-dc3d-4f0b-9827-032fb1693502.jpg?station=2classicrock',
    artistName: 'Queen',
  };

  return (
    <Page withFooter backgroundImage={images?.stationBackgroundSmall} backgroundColor={station?.backgroundColour}>
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
              />
            </Box>
            <Box width={[1, 1, 0.6]} pt={[spacing.l, spacing.l, 0]} pl={[0]}>
              <NowPlaying
                isPlaying
                bgColour={backgroundColour}
                currentTrack={currentTrack}
                stationName={name}
                openPlayer={() => undefined}
                dataTest="now-playing"
              />
            </Box>
          </Flex>
        </Section>
      </Container>
    </Page>
  );
};

Station.propTypes = {
  station: shape({
    name: string.isRequired,
    backgroundColour: string.isRequired,
    images: shape({
      stationBackgroundSmall: string.isRequired,
      logoLarge: string.isRequired,
    }),
  }).isRequired,
};

export default Station;
