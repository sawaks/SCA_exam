import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import PlayIcon from 'components/Icons/rounded-play.svg';
import PauseIcon from 'components/Icons/pause.svg';
import StopIcon from 'components/Icons/stop.svg';
import LoadingIcon from 'components/Icons/loading.svg';

const StyledButton = styled.button`
  transition: transform 0.2s ease, background-color 0.2s ease;
  background-color: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  height: ${props => props.size};

  & svg {
    width: ${props => props.size};
    height: ${props => props.size};
  }

  &:hover,
  &:active {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

const SpinKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const AnimatedLoadingIcon = styled(LoadingIcon)`
  animation: ${SpinKeyFrame} 0.75s linear infinite;
`;

function PlayButtonUI({ isPlaying, isStreaming, isLoading, onClick, variant, ...props }) {
  const getButtonSize = () => {
    if (variant === 'xxs') {
      return '22px';
    }
    if (variant === 'xs') {
      return '33px';
    }
    if (variant === 's') {
      return '36px';
    }

    if (variant === 'm') {
      return '40px';
    }

    if (variant === 'l') {
      return '55px';
    }

    return '70px';
  };

  const getTrackStatusIcon = () => {
    if (isLoading) {
      return <AnimatedLoadingIcon />;
    }
    // stop icon for streaming
    if (!isPlaying && isStreaming) {
      return <StopIcon />;
    }

    // pause icon for non-streaming
    if (isPlaying && !isStreaming) {
      return <PauseIcon />;
    }

    return <PlayIcon />;
  };

  const getTitle = () => {
    if (isLoading) {
      return 'Loading';
    }

    if (!isPlaying && isStreaming) {
      return 'Stop';
    }

    if (isPlaying && !isStreaming) {
      return 'Pause';
    }

    return 'Play';
  };

  return (
    <StyledButton size={getButtonSize()} onClick={onClick} title={getTitle()} {...props}>
      {getTrackStatusIcon()}
    </StyledButton>
  );
}

PlayButtonUI.propTypes = {
  onClick: PropTypes.func,
  isStreaming: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l']),
};

PlayButtonUI.defaultProps = {
  variant: 'l',
  onClick: null,
  isStreaming: false,
  isPlaying: false,
  isLoading: false,
};

export default PlayButtonUI;
