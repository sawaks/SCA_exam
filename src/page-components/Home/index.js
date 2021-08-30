/* eslint-disable react/forbid-prop-types */
import AppBanner from 'components/AppBanner';
import { Container } from 'components/Grid';
import FullWidthSection from 'components/Layout/FullWidthSection';
import Page from 'components/Layout/Page';
import Head from 'next/head';
import { any, arrayOf, object, shape, string } from 'prop-types';
import React from 'react';
import { LISTNR_META } from 'utilities/constants';
import LiveStations from './components/LiveStations';
import PodcastCategories from './components/PodcastCategories';

const Home = ({ promotedCategories, promotedStations, downloadAppBanner }) => (
  <Page withNav withFooter>
    <Head>
      <title>{LISTNR_META.pages.browse.title}</title>
      <meta name="title" content={LISTNR_META.pages.browse.title} />
      <meta name="description" content={LISTNR_META.pages.browse.description} />
      <link rel="canonical" href="/" />
    </Head>
    <Container>
      { promotedCategories && <PodcastCategories podcastCategories={promotedCategories} /> }
      { promotedStations && <LiveStations promotedStations={promotedStations} /> }
    </Container>
    <FullWidthSection fullWidth>
      <AppBanner
        title={downloadAppBanner?.title}
        description={downloadAppBanner?.description}
        backgroundImageUrl={downloadAppBanner?.backgroundImageUrl}
      />
    </FullWidthSection>
  </Page>
);

Home.propTypes = {
  downloadAppBanner: shape({
    backgroundImageUrl: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
  }).isRequired,
  promotedCategories: arrayOf(any).isRequired,
  promotedStations: arrayOf(object).isRequired,
};

export default Home;
