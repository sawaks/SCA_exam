import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/Grid';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { formatSecondsToTime } from 'utilities/helpers/dateTime';
import { connect } from 'react-redux';
import Paragraph from 'components/Typography/Paragraph';

const Root = styled(Flex)`
  position: absolute;
  top: 16px;
  right: 0;
  width: 100%;

  ${screen.sm} {
    top: 18px;
  }
`;

function TimeInfo({ currentTime, duration }) {
  return (
    <Root justifyContent="space-between" px="1px">
      <Paragraph fontWeight={600} time={currentTime}>
        {formatSecondsToTime(currentTime)}
      </Paragraph>
      <Paragraph fontWeight={600} time={duration}>
        {formatSecondsToTime(duration)}
      </Paragraph>
    </Root>
  );
}

TimeInfo.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
};
TimeInfo.defaultProps = {
  currentTime: null,
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

