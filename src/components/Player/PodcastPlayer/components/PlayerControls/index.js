import { Flex } from 'components/Grid';
import FastForward from 'components/Player/FastFoward';
import Next from 'components/Player/NextButton';
import PlayButton from 'components/Player/PlayButton';
import Previous from 'components/Player/PreviousButton';
import Rewind from 'components/Player/Rewind';
import PropTypes from 'prop-types';
import React from 'react';
import spacing from 'styles/helpers/spacing';

function PlayerControls({ analyticsData, music }) {
  return (
    <Flex justifyContent="center" width="100%" mb={spacing.l} mt={spacing.m}>
      <Flex justifyContent="space-between" alignItems="center" width="90%">
        <Previous music={music} analyticsData={analyticsData} />
        <Rewind music={music} />
        <PlayButton variant="l" expanded analyticsData={analyticsData} />
        <FastForward music={music} />
        <Next analyticsData={analyticsData} />
      </Flex>
    </Flex>
  );
}

PlayerControls.propTypes = {
  music: PropTypes.bool,
  analyticsData: PropTypes.shape({
    showName: PropTypes.string,
    showCategory: PropTypes.string,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    streamingUrl: PropTypes.string,
  }).isRequired,
};

PlayerControls.defaultProps = {
  music: false,
};

export default PlayerControls;
