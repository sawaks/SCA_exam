import { Flex } from 'components/Grid';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import PropTypes from 'prop-types';
import MaximizePlayer from './components/MaximizePlayer';
import PlayLiveButton from './components/PlayLiveButton';
import PlayLiveShowButton from './components/PlayLiveShowButton';
import { PLAYER_OVERLAY_TYPE } from '../../../../../../../utilities/constants';

const StyledPlayerControls = styled(Flex)`
  margin: 0;
  user-select: none;
`;

const Controls = styled.div`
  display: none;

  ${screen.md} {
    display: flex;
    align-items: center;
  }
`;

function PlayerControls({ type }) {
  return (
    <StyledPlayerControls justifyContent="start" alignItems="center">
      {type === PLAYER_OVERLAY_TYPE.LIVE_STREAM && <PlayLiveButton />}
      {type === PLAYER_OVERLAY_TYPE.LIVE_SHOW && <PlayLiveShowButton />}
      <Controls>
        <MaximizePlayer />
      </Controls>
    </StyledPlayerControls>
  );
}

PlayerControls.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PlayerControls;
