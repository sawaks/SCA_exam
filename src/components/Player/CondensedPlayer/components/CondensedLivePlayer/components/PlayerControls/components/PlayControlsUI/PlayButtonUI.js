import LoadingIcon from 'components/Icons/loading.svg';
import PlayIcon from 'components/Icons/rounded-play.svg';
import { bool, func } from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import screen from 'styles/helpers/media';
import StopIcon from './StopIcon';

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

function PlayButton({ isPlaying, isLoading, onClick }) {
  const getTrackStatusIcon = () => {
    if (isLoading) {
      return <AnimatedLoadingIcon />;
    }

    if (isPlaying) {
      return <StopIcon />;
    }

    return <PlayIcon />;
  };

  const getTitle = () => {
    if (isLoading) {
      return 'Loading';
    }

    if (isPlaying) {
      return 'Stop';
    }

    return 'Play';
  };

  return (
    <Wrapper onClick={onClick}>
      <PlayStatus title={getTitle()}>{getTrackStatusIcon()}</PlayStatus>
    </Wrapper>
  );
}

PlayButton.propTypes = {
  onClick: func,
  isPlaying: bool,
  isLoading: bool,
};

PlayButton.defaultProps = {
  onClick: null,
  isPlaying: false,
  isLoading: false,
};

export default PlayButton;
