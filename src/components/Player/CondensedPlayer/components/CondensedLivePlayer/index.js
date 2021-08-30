import { Container, Flex } from 'components/Grid';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import PropTypes from 'prop-types';
import ClosePlayer from './components/ClosePlayer';
import PlayerControls from './components/PlayerControls';
import LiveStreamTrackInfo from './components/LiveStreamTrackInfo';
import LiveShowTrackInfo from './components/LiveShowTrackInfo';
import { PLAYER_OVERLAY_TYPE } from '../../../../../utilities/constants';

function CondensedLivePlayer({ type }) {
  const liveStreamUrl = useSelector(({ liveStreamPlayer }) => liveStreamPlayer.sourceUrl, shallowEqual);
  const playerOverlayVisible = useSelector(({ playerOverlay }) => playerOverlay.visible, shallowEqual);
  if (!liveStreamUrl) {
    return null;
  }

  return (
    <Root playerOverlayVisible={playerOverlayVisible}>
      <StyledContainer>
        <Flex
          flexDirection={['row', 'row', 'row-reverse']}
          justifyContent="space-between"
          alignItems="center"
          style={{ height: '100%' }}
        >
          <ClosePlayer />
          {type === PLAYER_OVERLAY_TYPE.LIVE_STREAM && <LiveStreamTrackInfo />}
          {type === PLAYER_OVERLAY_TYPE.LIVE_SHOW && <LiveShowTrackInfo />}
          <PlayerControls type={type} />
        </Flex>
      </StyledContainer>
    </Root>
  );
}

const Root = styled.div`
  opacity: ${props => (props.playerOverlayVisible ? 0 : 1)};
  position: relative;
  width: 100%;
  box-shadow: inset 0px -8px 20px -8px rgba(0,0,0,0.3);
  background: ${props => props.theme.backgroundLight2};
  color: ${props => props.theme.light};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 18px;
  height: 44px;
  transition: opacity 400ms ease-in-out;

  ${screen.md} {
     height: 60px;
     box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledContainer = styled(Container)`
  height: 100%;
`;

CondensedLivePlayer.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CondensedLivePlayer;
