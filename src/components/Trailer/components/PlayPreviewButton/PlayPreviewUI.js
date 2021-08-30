import { Flex } from '@rebass/grid';
import PlayIcon from 'components/Icons/play.svg';
import StopIcon from 'components/Icons/stop-player.svg';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import rgba from 'styles/helpers/rgba';

function PlayPreviewUI({ text, playing, progress, onPlayClick, onStopClick, ...props }) {
  const selectIcon = () => {
    if (playing) {
      return <StopIcon />;
    }
    return <PlayIcon />;
  };

  const selectProgress = () => {
    if (progress && progress < 100) {
      return (
        <>
          <ProgressBackground />
          <ProgressWrapper>
            <Progress progress={progress} />
          </ProgressWrapper>
        </>
      );
    }
    return <StyledText>{text}</StyledText>;
  };

  return (
    <StyledButton {...props} onClick={e => (playing ? onStopClick(e) : onPlayClick(e))}>
      <Flex style={{ height: '100%' }}>
        <IconWrapper alignItems="center">
          <StyledIcon>
            {selectIcon()}
          </StyledIcon>
        </IconWrapper>
        <Flex justifyContent="center" alignItems="center" flex="1 1 100%" style={{ position: 'relative' }} onClick={onPlayClick}>
          {selectProgress()}
        </Flex>
      </Flex>
    </StyledButton>
  );
}

const StyledText = styled.div`
  margin: 0 ${spacing.s};
`;

const ProgressWrapper = styled.div`
  position: relative;
  height: 100%;
  width: calc( 100% - 48px);
`;

const ProgressBackground = styled.div`
  border-radius: 24px;
  position: absolute;
  top: 0;
  left: 6px;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.primary};
  opacity: 0.3;
  z-index: 1;
`;

const Progress = styled.div.attrs(props => ({
  style: { width: `${props.progress}%` },
}))`
  box-sizing: border-box;
  transition: width 0.1s ease-in-out;
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    left: -18px;
    height: 100%;
    width: 44px;
    border-radius: 24px;
    background-color: ${props => props.theme.primary};
  }

  &::after {
    content: '';
    position: absolute;
    right: -26px;
    height: 100%;
    width: 44px;
    border-radius: 24px;
    background-color: ${props => props.theme.primary};
  }
`;

const StyledButton = styled.button`
  font-size: 12px;
  font-weight: bold;
  display:block;
  height: 40px;
  width:inherit;
  color: ${props => props.theme.light};
  min-width: ${props => (props.minWidthMobile ? props.minWidthMobile : '124px')};
  max-width: ${props => (props.maxWidthMobile ? props.maxWidthMobile : 'none')};
  padding: 0 2px;
  border: none;
  border-radius: 24px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  text-decoration: none;
  overflow: hidden;
  transition: border-color 0.5s, background-color 0.5s;
  background-color: ${props => props.theme.backgroundLight};

  ${screen.sm} {
    margin-bottom: 0;
  }

  ${screen.md} {
    height: 44px;
    min-width: ${props => (props.minWidthDesktop ? props.minWidthDesktop : '170px')};
    max-width: ${props => (props.maxWidthDesktop ? props.maxWidthDesktop : 'none')};
  }

  &:disabled {
    opacity: 0.4;
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

const IconWrapper = styled(Flex)`
  position: relative;
`;

const StyledIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 24px;
  background-color: ${props => props.theme.primary};

  & svg {
    margin: 0 auto;
    height: 100%;
  }

  &:hover,
  &:active {
    outline: none;
    background-color: ${props => rgba(props.theme.primary, 0.3)};
  }

  ${screen.md} {
    width: 40px;
    height: 40px;
  }
`;

PlayPreviewUI.propTypes = {
  playing: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  minWidthMobile: PropTypes.string,
  maxWidthMobile: PropTypes.string,
  minWidthDesktop: PropTypes.string,
  maxWidthDesktop: PropTypes.string,
};

PlayPreviewUI.defaultProps = {
  minWidthMobile: null,
  maxWidthMobile: null,
  minWidthDesktop: null,
  maxWidthDesktop: null,
};

export default PlayPreviewUI;
