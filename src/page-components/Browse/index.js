/* eslint-disable react/forbid-prop-types */
import AppBanner from 'components/AppBanner';
import { Container } from 'components/Grid';
import FullWidthSection from 'components/Layout/FullWidthSection';
import Page from 'components/Layout/Page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { any, arrayOf, object, shape, string } from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { referrerPage } from 'store/actions/userInteractions';
import { getPromotedCategories } from 'utilities/api/graphql/categories/queryMethods';
import { getPage } from 'utilities/api/graphql/page/queryMethods';
import { getPromotedStations } from 'utilities/api/graphql/stations/queryMethods';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { LISTNR_META } from 'utilities/constants';
import LiveStations from './components/LiveStations';
import PodcastCategories from './components/PodcastCategories';

const Browse = ({ promotedCategories, promotedStations, downloadAppBanner }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.browsePage,
    });
    dispatch(referrerPage(router?.asPath));
  }, []);

  return (
    <Page withNav withAudio withFooter>
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
};

export const fetchData = async () => {
  const [promotedCategories, promotedStations, { page: { contentBlocks } }] = await Promise.all([
    getPromotedCategories(),
    getPromotedStations(),
    getPage('download-block'),
  ]);

  return {
    promotedCategories: promotedCategories?.promotedCategories,
    promotedStations: promotedStations?.promotedStations,
    downloadAppBanner: contentBlocks[0]?.blockData,
  };
};

Browse.propTypes = {
  downloadAppBanner: shape({
    backgroundImageUrl: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
  }).isRequired,
  promotedCategories: arrayOf(any).isRequired,
  promotedStations: arrayOf(object).isRequired,
};

export default Browse;
