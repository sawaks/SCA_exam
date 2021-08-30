import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Container, Flex } from 'components/Grid';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import SeekBar from 'components/Player/SeekBar';
import { CONTENT_TYPE } from '../../../../../utilities/constants';
import { Desktop } from '../../../../Screen';
import PlayerControls from './components/PlayerControls';
import TrackInfo from './components/TrackInfo';
import ClosePlayer from './components/ClosePlayer';

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

function CondensedPodcastPlayer() {
  const audioSourceUrl = useSelector(({ audioPlayer }) => audioPlayer.sourceUrl, shallowEqual);
  const playerOverlayVisible = useSelector(({ playerOverlay }) => playerOverlay.visible, shallowEqual);
  const music = useSelector(state => state.episode?.show?.contentType === CONTENT_TYPE.MUSIC, shallowEqual);
  if (!audioSourceUrl) {
    return null;
  }

  return (
    <Root playerOverlayVisible={playerOverlayVisible}>
      <StyledContainer>
        <Desktop>
          <SeekBar withTheming withBackground variant="xs" music={music} />
        </Desktop>
        <Flex
          flexDirection={['row', 'row', 'row-reverse']}
          justifyContent="space-between"
          alignItems="center"
          style={{ height: '100%' }}
        >
          <ClosePlayer />
          <TrackInfo />
          <PlayerControls music={music} />
        </Flex>
      </StyledContainer>
    </Root>
  );
}

export default CondensedPodcastPlayer;
