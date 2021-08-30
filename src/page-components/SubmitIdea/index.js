import React, { useEffect } from 'react';
import Head from 'next/head';
import Page from 'components/Layout/Page';
import Section from 'components/Section';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import get from 'lodash/get';
import { Container } from 'components/Grid';
import { Tabs, TabLink, TabContent } from 'components/Tabs';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import { LISTNR_META } from 'utilities/constants';
import GetInTouchForm from '../Contact/components/GetInTouchForm';
import SubmitIdeaForm from './components/SubmitIdeaForm';
import LocationDetails from '../Contact/components/LocationDetails';

const officeDetails = [
  {
    title: 'LiSTNR Sydney',
    address: {
      addr: 'Level 15, 50 Goulburn Street',
      state: 'NSW',
      postcode: '2000',
      suburb: 'Sydney',
      country: 'Australia',
    },
    mapEmbedSrc: 'https://maps.google.com/maps?hl=en&q=Level%2015,%2050%20Goulburn%20Street,%20Sydney,%20NSW%202000,%20Australia&ie=UTF8&t=&z=16&iwloc=B&output=embed',
  },
  {
    title: 'LiSTNR Melbourne',
    address: {
      addr: '257 Clarendon Street',
      state: 'VIC',
      postcode: '3205',
      suburb: 'South Melbourne',
      country: 'Australia',
    },
    mapEmbedSrc: 'https://maps.google.com/maps?hl=en&q=257%20Clarendon%20Street,%20South%20Melbourne,%20VIC%203205,%20Australia&ie=UTF8&t=&z=16&iwloc=B&output=embed',
  },
];

const SubmitIdea = () => {
  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.contactUsPage,
    });
  });

  const structuredData = officeDetails.map((item) => {
    const { addr, suburb, state, postcode, country } = get(item, 'address');
    const fullAddress = `${addr},${suburb} ${state} ${postcode}, ${country}`;
    return `
    {
      "@type": "PostalAddress",
      "addressLocality": "${suburb}",
      "addressRegion": "${state}",
      "postalCode": "${postcode}",
      "streetAddress": "${fullAddress}"
    }`;
  });

  return (
    <Page withNav withAudio withFooter>
      <Head>
        <title>{LISTNR_META.pages.submitIdea.title}</title>
        <meta name="title" content={LISTNR_META.pages.submitIdea.title} />
        <meta name="description" content={LISTNR_META.pages.submitIdea.description} />
        {/* Google structured data definition for search */}
        {/* eslint-disable react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "url": "${process.env.SITE_DOMAIN}",
                  "address": [${structuredData}]
                }`,
          }}
        />
      </Head>
      <Container>
        <HeaderWrapper>
          <Header as="h3" variant="xl" linesToShow={1} text="Contact us" />
        </HeaderWrapper>
        <Section top>
          <Tabs selected="Submit Podcast Idea" marginTop="none" paddingTop="xs" initialWidth={197} secondaryWidth={134}>
            <TabLink text="Get In Touch" href="/contact-us" />
            <TabLink text="Submit Podcast Idea" />
            <TabLink text="Location Details" href="/location-details" />
            <TabContent for="Get In Touch" key="getInTouch">
              <GetInTouchForm />
            </TabContent>
            <TabContent for="Submit Podcast Idea" key="submitIdea">
              <SubmitIdeaForm />
            </TabContent>
            <TabContent for="Location Details" key="locationDetails">
              <LocationDetails {...{ officeDetails }} />
            </TabContent>
          </Tabs>
        </Section>
      </Container>
    </Page>
  );
};

export default SubmitIdea;

const HeaderWrapper = styled.div`
  margin: 0 0 ${spacing.m} 0;
  ${screen.sm} {
    margin: 0 0 ${spacing.l} 0;
  }
`;
