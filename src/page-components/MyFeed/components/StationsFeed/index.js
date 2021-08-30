import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import EmptyFeedImage from 'components/Icons/empty-feed.svg';
import { fetchStationsFeed } from 'store/actions/my-feed';
import { displaySignupModal } from 'store/actions/userInteractions';
import FeedLoading from '../PodcastFeed/components/FeedLoading';
import Header from '../../../../components/Typography/Header';
import Paragraph from '../../../../components/Typography/Paragraph';
import StationFeedUI from './components/StationFeedUI';

const StationsFeed = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ profile }) => profile.userId, shallowEqual);
  const storedFeed = useSelector(state => state.myFeed.stations, shallowEqual);
  const favouriteStations = useSelector(state => state.userSessionInfo.favouriteStations, shallowEqual);
  const favouriteGenres = useSelector(state => state.userSessionInfo.favouriteGenres, shallowEqual);
  const [bottomFeed, setBottomFeed] = useState(storedFeed?.bottom);
  const [topFeed, setTopFeed] = useState(storedFeed?.top);
  const [callSigns, setCallSigns] = useState([]);
  const [refreshDate, setRefreshDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState(false);

  const needsToWaitForTopFeed = () => !isEmpty(favouriteStations);
  const needsToWaitForBottomFeed = () => !isEmpty(favouriteGenres);
  const noStationsFeed = () => isEmpty(favouriteStations) && isEmpty(favouriteGenres);

  function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  const fetchStationsFeedRetry = async (retries = 10, interval = 1000) => {
    if (noStationsFeed()) {
      const done = true;
      const top = [];
      const bottom = [];
      setLoading(false);
      return [top, bottom, done];
    }

    const [top, bottom] = await dispatch(fetchStationsFeed());

    if (needsToWaitForTopFeed() && top?.length) {
      const done = true;
      return [top, bottom, done];
    }

    if (needsToWaitForBottomFeed() && bottom?.length) {
      const done = true;
      return [top, bottom, done];
    }

    if (retries > 0) {
      setPlaceholder(true);
      await wait(interval);
      return fetchStationsFeedRetry(retries - 1);
    }

    if (retries === 0) {
      if (top?.length === 0 && bottom?.length === 0) {
        const errorMessage = {
          statusMessage: 'both top and bottom feeds are unavailable',
        };
        // eslint-disable-next-line no-console
        console.error('errorMessage=', errorMessage);
        // setFeedError(errorMessage);
      }
    }
    const done = false;
    setPlaceholder(false);
    setLoading(false);
    return [top, bottom, done];
  };

  useEffect(() => {
    if (isLoggedIn && !refreshDate) {
      const getFeed = async () => {
        const [top, bottom, done] = await fetchStationsFeedRetry(10, 1000);
        if (done) {
          setTopFeed(top || []);
          setBottomFeed(bottom || []);

          const stationCallSigns = [...top, ...bottom].map(item => item?.audioStreams[0]?.callSign.toLowerCase());
          setCallSigns(stationCallSigns);

          setRefreshDate(new Date());
        }
      };
      getFeed();
    }

    if (isLoggedIn !== null && !isLoggedIn) {
      dispatch(displaySignupModal());
    }
  }, [isLoggedIn]);

  const renderComponent = () => {
    if (callSigns.length > 0) {
      return <StationFeedUI topFeed={topFeed} bottomFeed={bottomFeed} callSigns={callSigns} />;
    }
    if (loading && placeholder && !topFeed.length && !bottomFeed.length) {
      return <FeedLoading />;
    }
    if (!topFeed.length && !bottomFeed.length && !loading && !placeholder) {
      return (
        <EmptyFeedWrapper>
          <EmptyFeedImage />
          <Header as="h3" variant="l" text="It’s looking pretty empty around here!" mt="m" mb="m" />
          <Paragraph variant="l" text="Favourite any radio so that it will appear in your live station feed." mb="m" />
        </EmptyFeedWrapper>
      );
    }
    return null;
  };

  return (
    <>
      {renderComponent()}
    </>
  );
};

const EmptyFeedWrapper = styled.div`
  align-self: center;
  text-align: center;
  margin: ${spacing.l} ${spacing.xl} ${spacing.xl} ${spacing.xl};
`;

export default StationsFeed;
