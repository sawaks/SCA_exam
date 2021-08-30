import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import rgba from 'styles/helpers/rgba';
import screen from 'styles/helpers/media';

const StyledButton = styled.button`
  color: ${props => props.theme.light};
  background: transparent;
  transition: transform 0.2s ease, background-color 0.2s ease;
  border-style: solid;
  border-width: 1px;
  border-color:  ${props => rgba(props.theme.light, 0.3)};
  border-radius: 100%;
  padding: 0;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  width: 40px;
  height: 40px;


  ${screen.md} {
    width: 112px;
    border-radius: 22px;
  }

  &:hover,
  &:active {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

function PlaybackRateButtonUI({ rate, isPlaying, isLoading, onClick, variant, disable, ...props }) {
  return (
    <StyledButton onClick={onClick} title="Playback rate" disable={disable} {...props}>
      {`${rate}x`}
    </StyledButton>
  );
}

PlaybackRateButtonUI.propTypes = {
  rate: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  isLoading: PropTypes.bool,
  disable: PropTypes.bool,
  variant: PropTypes.oneOf(['s', 'm', 'l']),
};

PlaybackRateButtonUI.defaultProps = {
  rate: 1,
  variant: 'm',
  isPlaying: false,
  isLoading: true,
  disable: false,
};

export default PlaybackRateButtonUI;
