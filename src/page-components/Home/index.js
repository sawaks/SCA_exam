/* eslint-disable react/forbid-prop-types */
import AppBanner from 'shared-components/AppBanner';
import { Box, Container } from 'shared-components/Grid';
import FullWidthSection from 'shared-components/Layout/FullWidthSection';
import Page from 'shared-components/Layout/Page';
import Head from 'next/head';
import { any, arrayOf, shape, string } from 'prop-types';
import React from 'react';
import Link from 'next/link';
import Header from 'shared-components/Typography/Header';
import spacing from 'styling/spacing';
import Paragraph from 'shared-components/Typography/Paragraph';
import routes from '../../routes';

const Home = ({ promotedCategories, downloadAppBanner }) => (
  <Page withNav withFooter>
    <Head>
      <title>LiSTNR</title>
      <meta name="title" content="LiSTNR" />
      <meta name="description" content="Browse the best LiSTNR has to offer including Previews and Top Episodes" />
    </Head>
    <Container>
      <Header as="h1" text="Podcast Categories" variant="xl" mb="l" />
      <Box height="75vh">
        { promotedCategories && (promotedCategories.map(category => (
          <Box key={category.slug} mb={spacing.l}>
            <Link
              href={`${routes.category}/${category.slug}`}
            >
              <a>
                <Paragraph text={category.name} variant="xl" />
              </a>
            </Link>
          </Box>
        ))) }
      </Box>
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
