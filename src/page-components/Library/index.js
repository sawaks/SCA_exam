import { Box } from '@rebass/grid';
import Divider from 'components/Divider';
import { Container } from 'components/Grid';
import Page from 'components/Layout/Page';
import Header from 'components/Typography/Header';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { displaySignupModal, referrerPage } from 'store/actions/userInteractions';
import styled, { keyframes, css } from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { LISTNR_META } from 'utilities/constants';
import ContinueListening from './components/ContinueListening';
import FavouriteCategoriesCarousel from './components/FavouriteCategoriesCarousel';
import FavouriteShowsCarousel from './components/FavouriteShowsCarousel';
import FavouriteGenresCarousel from './components/FavouriteGenresCarousel';
import FavouriteStationCarousel from './components/FavouriteStationCarousel';

const PageWrapper = styled.div`
  user-select: none;
`;

const LibraryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(({ profile }) => profile.userId, shallowEqual);
  const [isAlreadyLoggedIn] = useState(!!isLoggedIn);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.libraryPage,
    });
    dispatch(referrerPage(router?.asPath));
  }, []);

  useEffect(() => {
    if (isLoggedIn !== null && !isLoggedIn) {
      dispatch(displaySignupModal());
    }
  }, [isLoggedIn]);

  return (
    <PageWrapper>
      <Page withNav withAudio withFooter>
        <Head>
          <title>{LISTNR_META.pages.library.title}</title>
          <meta name="title" content={LISTNR_META.pages.library.title} />
          <meta name="description" content={LISTNR_META.pages.library.description} />
        </Head>
        <Container>
          <Header as="h1" variant="xl" mb="l" style={{ lineHeight: 1.2 }} text="Library" data-test="library-header" />
          <Box mb={spacing.xl}>
            <Divider />
          </Box>
          {isLoggedIn && (
            <Animate isAlreadyLoggedIn={isAlreadyLoggedIn}>
              <FavouriteShowsCarousel />
              <FavouriteCategoriesCarousel />
              <ContinueListening />
              <FavouriteStationCarousel />
              <FavouriteGenresCarousel />
            </Animate>
          )}
          {!isLoggedIn && <MinHeight />}
        </Container>
      </Page>
    </PageWrapper>
  );
};

const load = keyframes`
  0% {
    opacity: 0;
    transform: translateY(80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const MinHeight = styled.div`
  min-height: 80vh;
`;

const Animate = styled(MinHeight)`
  ${props => !props.isAlreadyLoggedIn && css`animation: ${load} 1.5s cubic-bezier(0.2, 0.6, 0.2, 1)`};
`;

export default LibraryPage;
