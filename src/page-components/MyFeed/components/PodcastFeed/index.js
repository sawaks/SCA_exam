import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import usePrevious from 'utilities/helpers/usePrevious';
import flow from 'lodash/flow';
import { fetchMyFeed } from 'store/actions/my-feed';
import combineWithPersonalisedData from 'utilities/helpers/combineWithPersonalisedData';
import isEmpty from 'lodash/isEmpty';
import {
  displaySignupModal,
  refreshEpisodeListCompleted,
} from 'store/actions/userInteractions';
import { EPISODE_ORIGIN } from 'utilities/constants';
import FeedLoading from './components/FeedLoading';
import FeedList from './components/FeedList';
import TopBottomDivide from './components/TopBottomDivide';

const PodcastFeed = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ profile }) => profile.userId, shallowEqual);
  const storedFeed = useSelector(state => state.myFeed.podcasts, shallowEqual);
  const activeEpId = useSelector(state => state.episode?.id, shallowEqual);
  const listenedEpisodes = useSelector(state => state.userSessionInfo.listenedEpisodes, shallowEqual);
  const favouriteShows = useSelector(state => state.userSessionInfo.favouriteShows, shallowEqual);
  const refreshEpisodeList = useSelector(state => state.userInteractions.refreshEpisodeList, shallowEqual);
  const [bottomFeed, setBottomFeed] = useState(storedFeed.bottom?.entries);
  const [showDivider, setShowDivider] = useState(false);
  const [feedDeltas, setFeedDeltas] = useState(null);
  const [topFeed, setTopFeed] = useState(storedFeed.top?.entries);
  const [loading, setLoading] = useState(!storedFeed.top?.entries);
  const [refreshDate, setRefreshDate] = useState('');

  const removeCompleted = episodes => episodes?.filter(episode => !episode.isCompleted);
  const filterEpisodes = flow([combineWithPersonalisedData, removeCompleted]);
  const previousRefresh = usePrevious(refreshEpisodeList);

  const needsToWaitForTopFeed = () => !isEmpty(favouriteShows);

  function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  const fetchFeedRetry = async (retries = 10, interval = 1000) => {
    const [top, bottom] = await dispatch(fetchMyFeed());

    if (needsToWaitForTopFeed() && top?.entries?.length) {
      const done = true;
      return [top, bottom, done];
    }

    if (!needsToWaitForTopFeed() && bottom?.entries?.length) {
      const done = true;
      return [top, bottom, done];
    }

    if (retries > 0) {
      await wait(interval);
      return fetchFeedRetry(retries - 1);
    }

    if (retries === 0) {
      if (top?.entries?.length === 0 && bottom?.entries?.length === 0) {
        setLoading(false);
        const errorMessage = {
          statusMessage: 'both top and bottom feeds are unavilable',
        };
        // eslint-disable-next-line no-console
        console.error('errorMessage=', errorMessage);
        // setFeedError(errorMessage);
      }
    }
    const done = false;
    return [top, bottom, done];
  };

  const getMostRecentDate = (top, bottom) => {
    // Top feed may not be there, so default to 1970 to ensure bottom feed time get priority when top feed is not there.
    const refreshDateTop = top?.updated || '1970-09-15T04:28:12.668Z';
    const refreshDateBottom = bottom?.updated;
    return new Date(refreshDateBottom).getTime()
      > new Date(refreshDateTop).getTime()
      ? refreshDateBottom
      : refreshDateTop;
  };

  useEffect(() => {
    if (isLoggedIn && !refreshDate) {
      const getFeed = async () => {
        const [top, bottom, done] = await fetchFeedRetry(10, 1000);
        const feedDeltaCheck = top?.entries[0]?.id !== bottom?.entries[0]?.id;
        if (done) {
          setTopFeed(filterEpisodes(top?.entries || [], listenedEpisodes));
          setBottomFeed(
            filterEpisodes(bottom?.entries || [], listenedEpisodes)
          );
          setRefreshDate(getMostRecentDate(top, bottom));
          setLoading(false);
          setFeedDeltas(feedDeltaCheck);
          setShowDivider(
            top?.entries.length > 0
              && bottom?.entries.length > 0
              && feedDeltaCheck
          );
        }
      };

      getFeed();
    }

    if (isLoggedIn !== null && !isLoggedIn) {
      dispatch(displaySignupModal());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!previousRefresh && refreshEpisodeList) {
      setTopFeed(filterEpisodes(storedFeed.top?.entries, listenedEpisodes));
      setBottomFeed(
        filterEpisodes(storedFeed.bottom?.entries, listenedEpisodes)
      );
      setShowDivider(
        storedFeed.top?.entries?.length > 0 && storedFeed.bottom?.entries?.length > 0
      );

      dispatch(refreshEpisodeListCompleted());
    }
  }, [refreshEpisodeList]);

  return (
    <>
      {loading ? (
        <FeedLoading />
      ) : (
        <>
          <FeedList
            feed={topFeed}
            feedCategory="top"
            activeEpId={activeEpId}
            origin={EPISODE_ORIGIN.topFeed}
          />
          {showDivider && <TopBottomDivide />}
          {bottomFeed && feedDeltas && (
            <FeedList
              feed={bottomFeed}
              feedCategory="bottom"
              activeEpId={activeEpId}
              origin={EPISODE_ORIGIN.bottomFeed}
            />
          )}
        </>
      )}
    </>
  );
};

export default PodcastFeed;
