import * as player from 'components/Player/AudioPlayer/player';
import PropTypes, { oneOf } from 'prop-types';
import React from 'react';
import FastForwardUI from './FastForwardUI';

function FastForward({ variant, music }) {
  function handleSkipForward(e) {
    e.stopPropagation(); // we need this so it does not call handleClick

    if (music) {
      player.seek(30);
    } else {
      player.seek(10);
    }
  }

  return <FastForwardUI onClick={handleSkipForward} variant={variant} music={music} />;
}

FastForward.propTypes = {
  variant: oneOf(['light', 'dark']),
  music: PropTypes.bool,
};

FastForward.defaultProps = {
  variant: 'light',
  music: false,
};

export default FastForward;
