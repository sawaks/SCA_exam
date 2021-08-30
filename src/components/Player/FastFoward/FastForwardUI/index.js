import React from 'react';
import { bool, func, oneOf } from 'prop-types';
import styled from 'styled-components';
import TrackForwardIcon from 'components/Icons/forward.svg';
import TrackForwardIcon30 from 'components/Icons/forward-30.svg';

const FastForwardTrack = styled.button`
  appearance: none;
  border: none;
  background: none;
  width: 33px;
  cursor: pointer;

  & path {
    fill: ${props => (props.variant === 'light' ? props.theme.light : props.theme.black)};
  }

  &:focus {
    outline: none;
  }
`;

function FastForwardUI({ onClick, variant, music }) {
  return (
    <FastForwardTrack
      onClick={onClick}
      variant={variant}
      music={music}
      title="Skip forward"
    >
      {music ? <TrackForwardIcon30 /> : <TrackForwardIcon />}
    </FastForwardTrack>
  );
}

FastForwardUI.propTypes = {
  onClick: func.isRequired,
  variant: oneOf(['light', 'dark']),
  music: bool,
};

FastForwardUI.defaultProps = {
  variant: 'light',
  music: false,
};

export default FastForwardUI;
