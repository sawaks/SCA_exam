import StationCard from 'components/Card/StationCard';
import isEqual from 'lodash/isEqual';
import { arrayOf, oneOf, shape, string } from 'prop-types';
import React from 'react';
import { EPISODE_ORIGIN } from 'utilities/constants';

const StationFeedList = ({ feed = [], origin }) => (
  <>
    {feed.map(station => (
      <StationCard
        key={station.name}
        bgImage={station.images?.liveBackgroundLarge}
        callSign={station?.audioStreams[0]?.callSign}
        colour={station.backgroundColour}
        logoImage={station.images?.logoLarge}
        stationName={station.name}
        stationSlug={station.slug}
        origin={origin}
      />
    ))}
  </>
);

StationFeedList.propTypes = {
  feed: arrayOf(shape({
    audioStreams: arrayOf(shape({ callSign: string })),
    backgroundColour: string,
    images: shape({ logoLarge: string, liveBackgroundLarge: string }),
    name: string,
    slug: string,
  })),
  origin: oneOf([EPISODE_ORIGIN.topFeed, EPISODE_ORIGIN.bottomFeed]).isRequired,
};

StationFeedList.defaultProps = {
  feed: [],
};

export default React.memo(StationFeedList, isEqual);
