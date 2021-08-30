import React from 'react';
import { Flex } from 'components/Grid';
import screen from 'styles/helpers/media';
import styled from 'styled-components';
import Rewind from 'components/Player/Rewind';
import FastForward from 'components/Player/FastFoward';
import spacing from 'styles/helpers/spacing';
import PropTypes from 'prop-types';
import TimeInfo from './components/TimeInfo';
import MaximizePlayer from './components/MaximizePlayer';
import PlayProgressButton from './components/PlayProgressButton';

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

const Gap = styled.div`
  padding: 0 ${spacing.m};
`;

function PlayerControls({ music }) {
  return (
    <StyledPlayerControls justifyContent="start" alignItems="center">
      <PlayProgressButton />
      <Controls>
        <Flex alignItems="center" ml={spacing.l}>
          <Rewind variant="light" music={music} />
          <Gap />
          <FastForward variant="light" music={music} />
        </Flex>
        <MaximizePlayer />
        <TimeInfo />
      </Controls>
    </StyledPlayerControls>
  );
}

PlayerControls.propTypes = {
  music: PropTypes.bool,
};

PlayerControls.defaultProps = {
  music: false,
};

export default PlayerControls;
