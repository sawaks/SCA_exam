import { Flex } from 'components/Grid';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import MinimizePlayer from '../../../../MinimizePlayer';
import PlayerControls from './components/PlayerControls';
import ActionBar from './components/ActionBar';
import StationInfo from './components/StationInfo';

function LivePlayerDisplay({ backgroundColour, stationLogoImageUrl, playerBackgroundImageUrl, displayDownloadBanner }) {
  return (
    <Root playerBackgroundImageUrl={playerBackgroundImageUrl}>
      {stationLogoImageUrl && (
        <StyledImage alt="station-logo" src={stationLogoImageUrl} backgroundColour={backgroundColour} />
      )}
      <StyledHero>
        <MinimizePlayer />
        <Wrapper flexDirection="column" justifyContent="flex-end" displayDownloadBanner={displayDownloadBanner}>
          <StationInfo />
          <Hr />
          <PlayerControls />
          <ActionBar />
        </Wrapper>
      </StyledHero>
    </Root>
  );
}

const StyledImage = styled.img`
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 230px;
  height: 230px;
  object-fit: contain;
  border-radius: 50%;
  background-color: ${props => props.backgroundColour};
  padding: 36px;
  
  ${screen.md} {
    top: 8%;
    width: 300px;
    height: 300px;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 0;
  opacity: 0.3;
  border-top: 2px solid ${props => props.theme.whiteColor};
  margin-bottom: ${spacing.m};
`;

const Root = styled.div`
  background-color: ${props => props.theme.primary};
  background-image: ${props => (props.playerBackgroundImageUrl ? `url(${props.playerBackgroundImageUrl})` : 'none')};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  transition: background-image 1000ms ease-out 200ms;
  position: relative;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  
  ${screen.md} {
    height: 760px;
  }
`;

const Wrapper = styled(Flex)`
  padding: ${spacing.m};
`;

const StyledHero = styled(Flex)`
  width: 100%;
  overflow: visible;
  padding: ${spacing.m};
  color: ${props => props.theme.whiteColor};
  background: ${props => props.theme.backgroundGradient};
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

LivePlayerDisplay.propTypes = {
  backgroundColour: PropTypes.string,
  stationLogoImageUrl: PropTypes.string,
  playerBackgroundImageUrl: PropTypes.string,
  displayDownloadBanner: PropTypes.bool,
};

LivePlayerDisplay.defaultProps = {
  backgroundColour: null,
  stationLogoImageUrl: null,
  playerBackgroundImageUrl: null,
  displayDownloadBanner: false,
};

export default React.memo(LivePlayerDisplay, isEqual);
