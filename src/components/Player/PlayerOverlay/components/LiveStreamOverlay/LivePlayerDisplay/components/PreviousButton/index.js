import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { openLiveStreamPlayer } from 'store/actions/player-overlay';
import { LIVE_STREAM_ORIGIN } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import PreviousButtonUI from './PreviousButtonUI';

function PreviousButton({ analyticsData }) {
  const dispatch = useDispatch();
  const [prevStationIndex, setPrevStationIndex] = useState(null);
  const stationSlug = useSelector(state => state.station?.slug);
  const moreStations = useSelector(state => state.moreStations);

  useEffect(() => {
    const index = moreStations.findIndex(item => item.slug === stationSlug);
    if (index === 0) {
      setPrevStationIndex(null);
      return;
    }
    setPrevStationIndex(index - 1);
  }, [moreStations]);

  const handlePrevious = async (e) => {
    e.stopPropagation();

    dispatch(openLiveStreamPlayer(moreStations[prevStationIndex].slug, LIVE_STREAM_ORIGIN.moreStationsList));
    addToDataLayer({
      event: gtm.playerPreviousTrack,
      ...analyticsData,
    });
  };

  return (
    <PreviousButtonUI onClick={handlePrevious} enable={prevStationIndex !== null} />
  );
}

PreviousButton.propTypes = {
  analyticsData: PropTypes.shape({
    pageType: PropTypes.string,
    stationName: PropTypes.string,
    stationCode: PropTypes.string,
    stationType: PropTypes.string,
    network: PropTypes.string,
    state: PropTypes.string,
  }),
};

PreviousButton.defaultProps = {
  analyticsData: null,
};

export default PreviousButton;
