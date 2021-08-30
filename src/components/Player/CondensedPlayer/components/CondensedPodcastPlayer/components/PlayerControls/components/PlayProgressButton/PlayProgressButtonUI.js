import LoadingIcon from 'components/Icons/loading.svg';
import PlayIcon from 'components/Icons/rounded-play.svg';
import RadialProgressBar from 'components/RadialProgressBar';
import { bool, func, number } from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import screen from 'styles/helpers/media';
import PauseIcon from './PauseIcon';

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  & svg {
    width: 110%;
    height: 110%;
    position: absolute;
  }
`;

const PlayStatus = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background-color: ${props => props.theme.primary};
  outline: none;
  appearance: none;
  border: transparent;
  cursor: pointer;

  & svg {
    width: 85%;
    height: 85%;
  }

  ${screen.md} {
    width: 36px;
    height: 36px;
    & svg {
      width: 90%;
      height: 90%;
    }
  }
`;

function PlayProgressButtonUI({ isPlaying, isLoading, onClick, progress }) {
  const getTrackStatusIcon = () => {
    if (isLoading) {
      return <AnimatedLoadingIcon />;
    }

    if (isPlaying) {
      return <PauseIcon />;
    }

    return <PlayIcon />;
  };

  const getTitle = () => {
    if (isLoading) {
      return 'Loading';
    }

    if (isPlaying) {
      return 'Pause';
    }

    return 'Play';
  };

  return (
    <Wrapper onClick={onClick}>
      <RadialProgressBar percentage={progress} strokeWidth={2} trailStrokeWidth={2} lightMode hideOnDesktop />
      <PlayStatus title={getTitle()}>{getTrackStatusIcon()}</PlayStatus>
    </Wrapper>
  );
}

PlayProgressButtonUI.propTypes = {
  onClick: func,
  isPlaying: bool,
  isLoading: bool,
  progress: number,
};

PlayProgressButtonUI.defaultProps = {
  onClick: null,
  isPlaying: false,
  isLoading: false,
  progress: 0,
};

export default PlayProgressButtonUI;
