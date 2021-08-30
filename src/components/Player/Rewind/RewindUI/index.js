import React from 'react';
import { bool, func, oneOf } from 'prop-types';
import styled from 'styled-components';
import TrackRewindIcon from 'components/Icons/rewind.svg';
import TrackRewindIcon30 from 'components/Icons/rewind-30.svg';

const RewindTrack = styled.button`
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

function RewindUI({ onClick, variant, music }) {
  return (
    <RewindTrack
      onClick={onClick}
      variant={variant}
      music={music}
      title="Skip backward"
    >
      {music ? <TrackRewindIcon30 /> : <TrackRewindIcon />}
    </RewindTrack>
  );
}

RewindUI.propTypes = {
  onClick: func.isRequired,
  variant: oneOf(['light', 'dark']),
  music: bool,
};

RewindUI.defaultProps = {
  variant: 'light',
  music: false,
};

export default RewindUI;
