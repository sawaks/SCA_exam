import isEqual from 'lodash/isEqual';
import { arrayOf, shape, string } from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeMulti, unSubscribeMulti } from 'store/actions/now-playing';
import { EPISODE_ORIGIN } from 'utilities/constants';
import StationFeedList from './StationFeedList';
import TopBottomDivide from './TopBottomDivide';

const StationFeedUI = ({ topFeed, bottomFeed, callSigns }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeMulti(callSigns));
    return () => dispatch(unSubscribeMulti(callSigns));
  }, []);

  return (
    <>
      <StationFeedList feed={topFeed} origin={EPISODE_ORIGIN.topFeed} />
      {topFeed.length > 0 && bottomFeed.length > 0 && <TopBottomDivide />}
      <StationFeedList feed={bottomFeed} origin={EPISODE_ORIGIN.bottomFeed} />
    </>
  );
};

const feedPropType = arrayOf(shape({
  audioStreams: arrayOf(shape({ callSign: string })),
  backgroundColour: string,
  images: shape({ logoLarge: string, liveBackgroundLarge: string }),
  name: string,
  slug: string,
}));

StationFeedUI.propTypes = {
  topFeed: feedPropType,
  bottomFeed: feedPropType,
  callSigns: arrayOf(string).isRequired,
};

StationFeedUI.defaultProps = {
  topFeed: [],
  bottomFeed: [],
};

export default React.memo(StationFeedUI, isEqual);
