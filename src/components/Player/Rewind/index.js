import React from 'react';
import PropTypes, { oneOf } from 'prop-types';
import * as player from 'components/Player/AudioPlayer/player';
import RewindUI from './RewindUI';

function Rewind({ variant, music }) {
  const handleRewind = (e) => {
    e.stopPropagation();

    if (music) {
      player.seek(-30);
    } else {
      player.seek(-10);
    }
  };

  return <RewindUI onClick={handleRewind} variant={variant} music={music} />;
}
Rewind.propTypes = {
  variant: oneOf(['light', 'dark']),
  music: PropTypes.bool,
};

Rewind.defaultProps = {
  variant: 'light',
  music: false,
};

export default Rewind;
