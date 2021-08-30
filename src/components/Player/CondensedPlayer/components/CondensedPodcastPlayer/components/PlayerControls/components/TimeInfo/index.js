import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/Grid';
import { connect } from 'react-redux';
import spacing from 'styles/helpers/spacing';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { formatSecondsToTime } from 'utilities/helpers/dateTime';

const TimeFormat = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: normal;
  min-width: ${props => (props.time > 3600 ? '56px' : '36px')};

  ${screen.md} {
    opacity: ${props => (props.bold ? 1 : 0.6)};
  }
`;

const Dash = styled.span`
   margin: 0 ${spacing.s};
`;

function TimeInfo({ currentTime, duration }) {
  return (
    <Flex justifyContent="space-between">
      <TimeFormat bold time={currentTime}>
        {formatSecondsToTime(currentTime)}
      </TimeFormat>
      <Dash>-</Dash>
      <TimeFormat time={duration}>
        {formatSecondsToTime(duration)}
      </TimeFormat>
    </Flex>
  );
}

TimeInfo.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
};

TimeInfo.defaultProps = {
  currentTime: 0,
};

function mapStateToProps({ audioPlayer }) {
  return {
    currentTime: audioPlayer.currentTime,
    duration: audioPlayer.duration,
  };
}

export default connect(mapStateToProps)(TimeInfo);
