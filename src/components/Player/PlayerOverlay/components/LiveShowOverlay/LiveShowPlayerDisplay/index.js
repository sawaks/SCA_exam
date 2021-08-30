import { Flex, Box } from 'components/Grid';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import MinimizePlayer from '../../../../MinimizePlayer';
import PlayerControls from './components/PlayerControls';
import ActionBar from './components/ActionBar';
import ShowInfo from './components/ShowInfo';

function LiveShowPlayerDisplay({ playerBackgroundImageUrl, displayDownloadBanner, studioPhone, isLive }) {
  return (
    <Root>
      <StyleBlur isLive={isLive} playerBackgroundImageUrl={playerBackgroundImageUrl} />
      <StyledHero flexDirection="column" justifyContent="space-between">
        <MinimizePlayer />
        <Wrapper flexDirection="column" justifyContent="flex-end" displayDownloadBanner={displayDownloadBanner}>
          <ShowInfo isLive={isLive} />
          <Hr />
          <PlayerControls isLive={isLive} />
          <ActionBar studioPhone={studioPhone} isLive={isLive} />
        </Wrapper>
      </StyledHero>
    </Root>
  );
}

const Hr = styled.hr`
  width: 100%;
  border: 0;
  opacity: 1;
  border-top: 2px solid ${props => props.theme.whiteColor};
  margin-bottom: ${spacing.m};
`;

const Root = styled(Flex)`
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  position: relative;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  
  ${screen.md} {
    height: 760px;
  }
`;

const StyleBlur = styled(Box)`
  position: absolute;
  top: 0;
  width:100%;
  height: 100%;
  background-image: ${props => (props.playerBackgroundImageUrl ? `url(${props.playerBackgroundImageUrl})` : 'none')};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transform: scale(1.1);
  ${props => !props.isLive && css`
    filter: blur(5px) brightness(0.7);
  `};

  ${screen.md} {
    height: 760px;
  }
`;

const Wrapper = styled(Flex)`
  padding: ${spacing.m};
`;

const StyledHero = styled(Flex)`
  position: absolute;
  top: 0;
  width:100%;
  height: 100%;
  overflow: visible;
  padding: ${spacing.m};
  color: ${props => props.theme.whiteColor};
  background: ${props => props.theme.backgroundGradient};
`;

LiveShowPlayerDisplay.propTypes = {
  playerBackgroundImageUrl: PropTypes.string,
  displayDownloadBanner: PropTypes.bool,
  studioPhone: PropTypes.string,
  isLive: PropTypes.bool,
};

LiveShowPlayerDisplay.defaultProps = {
  playerBackgroundImageUrl: null,
  displayDownloadBanner: false,
  studioPhone: null,
  isLive: true,
};

export default React.memo(LiveShowPlayerDisplay, isEqual);
