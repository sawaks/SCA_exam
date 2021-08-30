import { Flex } from '@rebass/grid';
import { Content } from 'components/Grid';
import SlideUpOverlay from 'components/Layout/SlideUpOverlay';
import isEqual from 'lodash/isEqual';
import { arrayOf, bool, shape, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import LivePlayerDisplay from '../LivePlayerDisplay';
import MoreStationsList from '../MoreStationsList';

function LiveStreamOverlayUI({ visible, backgroundColour, stationLogoImageUrl, playerBackgroundImageUrl, relatedStations }) {
  return (
    <SlideUpOverlay visible={visible}>
      <StyledContainer flexDirection="column">
        <LivePlayerDisplay backgroundColour={backgroundColour} stationLogoImageUrl={stationLogoImageUrl} playerBackgroundImageUrl={playerBackgroundImageUrl} />
        <StyledContent pt={spacing.xl} px={spacing.l}>
          <MoreStationsList relatedStations={relatedStations} />
        </StyledContent>
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

LiveStreamOverlayUI.propTypes = {
  visible: bool.isRequired,
  backgroundColour: string,
  playerBackgroundImageUrl: string,
  stationLogoImageUrl: string,
  relatedStations: arrayOf(shape({
    name: string,
    slug: string,
    title: string,
    description: string,
  })).isRequired,
};

LiveStreamOverlayUI.defaultProps = {
  backgroundColour: null,
  playerBackgroundImageUrl: null,
  stationLogoImageUrl: null,
};

function areEqual(props, nextProps) {
  const overlayVisibilityUpdate = props.visible === nextProps.visible;
  const relatedStationsUpdate = isEqual(props.relatedStations, nextProps.relatedStations);

  return overlayVisibilityUpdate && relatedStationsUpdate;
}

export default React.memo(LiveStreamOverlayUI, areEqual);
