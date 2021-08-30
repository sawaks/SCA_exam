/* eslint-disable react/forbid-prop-types */
import AppBanner from 'components/AppBanner';
import { Container } from 'components/Grid';
import FullWidthSection from 'components/Layout/FullWidthSection';
import Page from 'components/Layout/Page';
import Head from 'next/head';
import { any, arrayOf, object, shape, string } from 'prop-types';
import React from 'react';
import LiveStations from './components/LiveStations';
import PodcastCategories from './components/PodcastCategories';

const Home = ({ promotedCategories, promotedStations, downloadAppBanner }) => (
  <Page withNav withFooter>
    <Head>
      <title>Browse Podcasts | LiSTNR</title>
      <meta name="title" content="Browse Podcasts | LiSTNR" />
      <meta name="description" content="Browse the best LiSTNR has to offer including Previews and Top Episodes" />
    </Head>
    <Container>
      { promotedCategories && <PodcastCategories podcastCategories={promotedCategories} /> }
      { promotedStations && <LiveStations promotedStations={promotedStations} /> }
    </Container>
    {downloadAppBanner && (
      <FullWidthSection fullWidth>
        <AppBanner
          title={downloadAppBanner?.title}
          description={downloadAppBanner?.description}
          backgroundImageUrl={downloadAppBanner?.backgroundImageUrl}
        />
      </FullWidthSection>
    )}
  </Page>
);

Home.propTypes = {
  downloadAppBanner: shape({
    backgroundImageUrl: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
  }),
  promotedCategories: arrayOf(any),
  promotedStations: arrayOf(object),
};

Home.defaultProps = {
  downloadAppBanner: null,
  promotedCategories: null,
  promotedStations: null,
};
export default Home;
