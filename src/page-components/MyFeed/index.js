import { Container, Flex } from 'components/Grid';
import Page from 'components/Layout/Page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { referrerPage } from 'store/actions/userInteractions';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { LISTNR_META } from 'utilities/constants';
import PodcastFeed from './components/PodcastFeed';
import FeedTypeSelector from './components/FeedTypeSelector';
import StationsFeed from './components/StationsFeed';

const MyFeed = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.myFeedPage,
    });
    dispatch(referrerPage(router?.asPath));
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page withNav withAudio withFooter>
      <Head>
        <title>{LISTNR_META.pages.myFeed.title}</title>
        <meta name="title" content={LISTNR_META.pages.myFeed.title} />
        <meta name="description" content={LISTNR_META.pages.myFeed.title} />
      </Head>
      <Container>
        <Flex flexWrap="wrap">
          <FeedTypeSelector setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
          <Flex
            width={[1, 1, 2 / 3]}
            flexDirection="column"
          >
            {selectedOption === 0 ? <PodcastFeed /> : <StationsFeed />}
          </Flex>
        </Flex>
      </Container>
    </Page>
  );
};

export default MyFeed;
