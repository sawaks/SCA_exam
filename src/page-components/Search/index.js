import React, { useEffect } from 'react';
import Page from 'components/Layout/Page';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import { Container } from 'components/Grid';
import Header from 'components/Typography/Header';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import Head from 'next/head';
import routes from 'common/named-routes';
import { LISTNR_META } from 'utilities/constants';
import Results from './components/Results';

const Search = () => {
  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.searchPage,
    });
  }, []);
  return (
    <Page withNav withAudio withFooter>
      <Head>
        {/* Google structured data definition for search */}
        {/* eslint-disable react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "url": "${process.env.SITE_DOMAIN}",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "${process.env.SITE_DOMAIN}${routes.external.search}?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              `,
          }}
        />
        <title>{LISTNR_META.pages.search.title}</title>
        <meta name="title" content={LISTNR_META.pages.search.title} />
        <meta name="description" content={LISTNR_META.pages.search.description} />
      </Head>
      <Container>
        <HeaderWrapper>
          <Header as="h3" variant="xl" linesToShow={1} mt={spacing.xl} text="Search Results" />
        </HeaderWrapper>
        <Results />
      </Container>
    </Page>
  );
};

const HeaderWrapper = styled.div`
  margin: ${spacing.l} 0 ${spacing.s} 0;
  ${screen.sm} {
    margin: ${spacing.xl} 0 ${spacing.s} 0;
  }
`;

export default Search;
