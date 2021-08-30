import React from 'react';
import Head from 'next/head';
import Page from 'components/Layout/Page';
import Section from 'components/Section';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import { Container } from 'components/Grid';
import { LISTNR_META } from 'utilities/constants';
import AdvertiseForm from './components/AdvertiseForm';

const Advertise = () => (
  <Page withNav withAudio withFooter>
    <Head>
      <title>{LISTNR_META.pages.advertise.title}</title>
      <meta name="title" content={LISTNR_META.pages.advertise.title} />
      <meta
        name="description"
        content={LISTNR_META.pages.advertise.description}
      />
    </Head>
    <Container>
      <HeaderWrapper>
        <Header
          as="h3"
          variant="xl"
          linesToShow={1}
          mt={spacing.xl}
          text="Advertise With Us"
        />
      </HeaderWrapper>
      <Section top>
        <AdvertiseForm />
      </Section>
    </Container>
  </Page>
);

export default Advertise;

const HeaderWrapper = styled.div`
  margin: ${spacing.l} 0 ${spacing.m} 0;
  ${screen.sm} {
    margin: ${spacing.xl} 0 ${spacing.l} 0;
  }
`;
