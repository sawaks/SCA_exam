import React, { useEffect } from 'react';
import Head from 'next/head';
import Page from 'components/Layout/Page';
import { Container, Flex } from 'components/Grid';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import Form from 'page-components/Newsletter/components/Form';
import styled from 'styled-components';
import toast from 'utilities/helpers/toast';
import { LISTNR_META } from 'utilities/constants';

const StyledCenteredLayout = styled(Flex)`
    padding: 0;
    margin: 0;
    align-content: center;
    align-items: center;
    justify-content: center;
`;

const onSubmit = () => {
  toast('You’ve successfully subscribed to the LiSTNR Newsletter');
  addToDataLayer({ event: gtm.newsletterStaticPageSubmitSuccess });
};

const Newsletter = () => {
  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.newsletterPage,
    });
  }, []);
  return (
    <Page withNav withAudio withFooter>
      <Head>
        <title>{LISTNR_META.pages.newsletter.title}</title>
        <meta name="title" content={LISTNR_META.pages.newsletter.title} />
        <meta name="description" content={LISTNR_META.pages.newsletter.description} />
      </Head>
      <Container>
        <StyledCenteredLayout flexDirection="column" justifiedContent="center">
          <Form
            onSubmitDone={onSubmit}
          />
        </StyledCenteredLayout>
      </Container>
    </Page>
  );
};

export default Newsletter;
