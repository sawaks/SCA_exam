import React from 'react';
import get from 'lodash/get';
import { shallowEqual, useSelector } from 'react-redux';
import { Flex } from 'components/Grid';
import PlayButton from 'components/Player/PlayButton';
import spacing from 'styles/helpers/spacing';

function PlayerControls() {
  // Retrieve station data for analytics
  const { analyticsData } = useSelector(({ liveShow }) => {
    const data = {
      pageType: 'liveShow',
      liveShowName: get(liveShow, 'liveShowName', null),
      streamingUrl: get(liveShow, 'audioStream.url', null),
    };
    return {
      analyticsData: data,
    };
  }, shallowEqual);

  return (
    <Flex justifyContent="center" width="100%" mt={spacing.m} mb={spacing.l}>
      <Flex justifyContent="center" alignItems="center" width="90%">
        <PlayButton variant="l" expanded analyticsData={analyticsData} />
      </Flex>
    </Flex>
  );
}

export default PlayerControls;
