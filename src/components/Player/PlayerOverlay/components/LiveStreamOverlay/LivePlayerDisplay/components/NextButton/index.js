import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { useDispatch, useSelector } from 'react-redux';
import { openLiveStreamPlayer } from 'store/actions/player-overlay';
import { LIVE_STREAM_ORIGIN } from 'utilities/constants';
import NextButtonUI from './NextButtonUI';

function NextButton({ analyticsData }) {
  const dispatch = useDispatch();
  const [nextStationIndex, setNextStationIndex] = useState(1);
  const stationSlug = useSelector(state => state.station?.slug);
  const moreStations = useSelector(state => state.moreStations);

  useEffect(() => {
    const index = moreStations.findIndex(item => item.slug === stationSlug);
    if (index === moreStations.length - 1) {
      setNextStationIndex(null);
      return;
    }
    setNextStationIndex(index + 1);
  }, [moreStations]);

  const handleNext = async (e) => {
    e.stopPropagation();

    dispatch(openLiveStreamPlayer(moreStations[nextStationIndex].slug, LIVE_STREAM_ORIGIN.moreStationsList));

    addToDataLayer({
      event: gtm.playerNextTrack,
      ...analyticsData,
    });
  };
  return (
    <NextButtonUI onClick={handleNext} disable={!nextStationIndex} />
  );
}

NextButton.propTypes = {
  analyticsData: PropTypes.shape({
    pageType: PropTypes.string,
    stationName: PropTypes.string,
    stationCode: PropTypes.string,
    stationType: PropTypes.string,
    network: PropTypes.string,
    state: PropTypes.string,
  }),
};

NextButton.defaultProps = {
  analyticsData: null,
};

export default NextButton;
