/* eslint-disable react/forbid-prop-types */
import Head from 'next/head';
import Page from 'components/Layout/Page';
import React from 'react';
import { Container } from 'components/Grid';
import { LISTNR_META } from 'utilities/constants';
import { arrayOf, object, shape, string } from 'prop-types';
import { getHeroContents } from 'utilities/api/graphql/shows/queryMethods';
import LiveStations from './components/LiveStations';
import HomePageHero from './components/HomePageHero';
import { getPromotedStations } from '../../utilities/api/graphql/stations/queryMethods';

const Browse = ({ heroContents, promotedStations }) => (
  <Page withNav withAudio withFooter>
    <Head>
      <title>{LISTNR_META.pages.browse.title}</title>
      <meta name="title" content={LISTNR_META.pages.browse.title} />
      <meta name="description" content={LISTNR_META.pages.browse.description} />
      <link rel="canonical" href="/" />
    </Head>
    <Container>
      { heroContents && <HomePageHero heroContents={heroContents} /> }
      { promotedStations && <LiveStations promotedStations={promotedStations} /> }
    </Container>
  </Page>
);

export const fetchData = async () => {
  const [heroContents, promotedStations] = await Promise.all([
    getHeroContents(),
    getPromotedStations(),
  ]);

  return {
    heroContents,
    promotedStations: promotedStations?.promotedStations,
  };
};

Browse.propTypes = {
  heroContents: arrayOf(shape({
    name: string,
    slug: string,
    heroImageUrl: string,
    heroImageMobileUrl: string,
    backgroundColor: string,
    tags: arrayOf(string),
    description: string,
  })),
  promotedStations: arrayOf(object).isRequired,
};

Browse.defaultProps = {
  heroContents: [],
};

export default Browse;
