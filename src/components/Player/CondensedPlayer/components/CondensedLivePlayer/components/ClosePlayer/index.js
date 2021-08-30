import React from 'react';
import * as liveStreamPlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import ClosePlayerUI from './components/ClosePlayerUI';

class ClosePlayer extends React.Component {
  handleOnClosePlayer = (e) => {
    e.stopPropagation();
    liveStreamPlayer.updateSource('', '');
  };

  render() {
    return <ClosePlayerUI onClick={this.handleOnClosePlayer} />;
  }
}
export default ClosePlayer;
