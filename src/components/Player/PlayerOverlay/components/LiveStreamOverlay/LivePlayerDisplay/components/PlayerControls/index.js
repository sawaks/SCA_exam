import React from 'react';
import get from 'lodash/get';
import { shallowEqual, useSelector } from 'react-redux';
import { Flex } from 'components/Grid';
import PlayButton from 'components/Player/PlayButton';
import spacing from 'styles/helpers/spacing';
import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';

function PlayerControls() {
  // Retrieve station data for analytics
  const { analyticsData } = useSelector(({ station }) => {
    const data = {
      pageType: 'station',
      stationName: get(station, 'name', null),
      stationCode: get(station, 'stationCode', null),
      stationType: get(station, 'stationType', null),
      network: get(station, 'network', null),
      state: get(station, 'state', null),
    };
    return {
      analyticsData: data,
    };
  }, shallowEqual);

  return (
    <Flex justifyContent="center" width="100%" mt={spacing.m} mb={spacing.l}>
      <Flex justifyContent="space-between" alignItems="center" width="90%">
        <PreviousButton analyticsData={analyticsData} />
        <PlayButton variant="l" expanded analyticsData={analyticsData} />
        <NextButton analyticsData={analyticsData} />
      </Flex>
    </Flex>
  );
}

export default PlayerControls;
