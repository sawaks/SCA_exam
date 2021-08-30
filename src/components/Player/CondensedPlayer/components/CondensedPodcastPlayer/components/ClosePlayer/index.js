import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as player from 'components/Player/AudioPlayer/player';
import ClosePlayerUI from './components/ClosePlayerUI';

class ClosePlayer extends React.Component {
  handleOnClosePlayer = (e) => {
    const { currentTime } = this.props;

    e.stopPropagation();
    player.updateSource('', '', currentTime);
  };

  render() {
    return <ClosePlayerUI onClick={this.handleOnClosePlayer} />;
  }
}

ClosePlayer.propTypes = {
  currentTime: PropTypes.number,
};

ClosePlayer.defaultProps = {
  currentTime: 0,
};

function mapStateToProps({ audioPlayer }) {
  return {
    currentTime: audioPlayer.currentTime,
  };
}

export default connect(mapStateToProps)(ClosePlayer);
