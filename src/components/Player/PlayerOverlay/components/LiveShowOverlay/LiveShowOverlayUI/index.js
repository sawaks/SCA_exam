import { Flex } from '@rebass/grid';
import { Content } from 'components/Grid';
import SlideUpOverlay from 'components/Layout/SlideUpOverlay';
import { bool, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import LiveShowPlayerDisplay from '../LiveShowPlayerDisplay';

function LiveShowOverlayUI({ visible, playerBackgroundImageUrl, studioPhone, isLive }) {
  return (
    <SlideUpOverlay visible={visible}>
      <StyledContainer flexDirection="column">
        <LiveShowPlayerDisplay playerBackgroundImageUrl={playerBackgroundImageUrl} studioPhone={studioPhone} isLive={isLive} />
        <StyledContent pt={spacing.xl} px={spacing.l} />
      </StyledContainer>
    </SlideUpOverlay>
  );
}

const StyledContainer = styled(Flex)`
  max-width: 823px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${screen.md} {
    padding-top: ${spacing.m};
    min-height: 100vh;
  }
`;

const StyledContent = styled(Content)`
  background-color: ${props => props.theme.background};
  flex-grow: 1;
`;

LiveShowOverlayUI.propTypes = {
  visible: bool.isRequired,
  playerBackgroundImageUrl: string,
  studioPhone: string,
  isLive: bool,
};

LiveShowOverlayUI.defaultProps = {
  playerBackgroundImageUrl: null,
  studioPhone: null,
  isLive: true,
};

export default React.memo(LiveShowOverlayUI);
