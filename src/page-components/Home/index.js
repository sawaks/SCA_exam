/* eslint-disable react/forbid-prop-types */
import AppBanner from 'shared-components/AppBanner';
import { Container, Flex } from 'shared-components/Grid';
import FullWidthSection from 'shared-components/Layout/FullWidthSection';
import Page from 'shared-components/Layout/Page';
import Head from 'next/head';
import { any, arrayOf, shape, string } from 'prop-types';
import React from 'react';
import PodcastCategories from './components/PodcastCategories';

const Home = ({ promotedCategories, downloadAppBanner }) => (
  <Page withNav withFooter>
    <Head>
      <title>LiSTNR</title>
      <meta name="title" content="LiSTNR" />
      <meta name="description" content="Browse the best LiSTNR has to offer including Previews and Top Episodes" />
    </Head>
    <Container>
      <Flex height="75vh">
        { promotedCategories && <PodcastCategories podcastCategories={promotedCategories} /> }
      </Flex>
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
};

Home.defaultProps = {
  downloadAppBanner: null,
  promotedCategories: null,
};

export default Home;
