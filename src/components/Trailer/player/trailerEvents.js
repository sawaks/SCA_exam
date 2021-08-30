import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  trailerEnd,
  trailerPause,
  trailerPlay,
  trailerPlayerLoaded,
  trailerUpdateCurrentTime,
  trailerUpdateDuration,
  trailerUpdateLoading,
  trailerUpdateSource,
} from 'store/actions/trailer-player';
import * as trailerController from './trailerController';

class TrailerEvents extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    playerTime: PropTypes.number,
  };

  static defaultProps = {
    playerTime: 0,
  };

  async componentDidMount() {
    trailerController.on(trailerController.events.PLAY_INIT, this.onPlayInit);
    trailerController.on(trailerController.events.PLAY, this.onPlay);
    trailerController.on(trailerController.events.PAUSE, this.onPause);
    trailerController.on(trailerController.events.SOURCE_UPDATE, this.onSourceUpdate);
    trailerController.on(trailerController.events.TIME_UPDATE, this.onTimeUpdate);
    trailerController.on(trailerController.events.DURATION_UPDATE, this.onDurationUpdate);
    trailerController.on(trailerController.events.END, this.onEnd);
    trailerController.on(trailerController.events.ERROR, this.onError);
    trailerController.on(trailerController.events.LOAD_START, this.onLoadStart);
    trailerController.on(trailerController.events.AUDIO_LOADING, this.onAudioLoading);

    this.props.dispatch(trailerPlayerLoaded());
  }

  componentWillUnmount() {
    trailerController.off(trailerController.events.PLAY_INIT, this.onPlayInit);
    trailerController.off(trailerController.events.PLAY, this.onPlay);
    trailerController.off(trailerController.events.PAUSE, this.onPause);
    trailerController.off(trailerController.events.SOURCE_UPDATE, this.onSourceUpdate);
    trailerController.off(trailerController.events.TIME_UPDATE, this.onTimeUpdate);
    trailerController.off(trailerController.events.DURATION_UPDATE, this.onDurationUpdate);
    trailerController.off(trailerController.events.END, this.onEnd);
    trailerController.off(trailerController.events.ERROR, this.onError);
    trailerController.off(trailerController.events.LOAD_START, this.onLoadStart);
    trailerController.off(trailerController.events.AUDIO_LOADING, this.onAudioLoading);
  }

  onPlayInit = () => {
    this.props.dispatch(trailerUpdateLoading(true));
  };

  onPlay = () => {
    this.props.dispatch(trailerPlay());
  };

  onPause = () => {
    this.props.dispatch(trailerPause());
  };

  onError = () => {
    this.props.dispatch(trailerUpdateLoading(false));
  };

  onTimeUpdate = (currentTime) => {
    const { loading, dispatch, playerTime } = this.props;
    if (loading && playerTime > 0) {
      // Ideally we should dispatch the trailerLoading action along side the trailerPlay event. But on iOS the event fires before the track actually starts playing
      dispatch(trailerUpdateLoading(false));
    }
    dispatch(trailerUpdateCurrentTime(currentTime));
  };

  onDurationUpdate = (duration) => {
    this.props.dispatch(trailerUpdateDuration(duration));
  };

  onSourceUpdate = ({ currentSource, playheadPosition }) => {
    this.props.dispatch(trailerUpdateSource(currentSource, playheadPosition));
  };

  onLoadStart=(loading) => {
    this.props.dispatch(trailerUpdateLoading(loading));
  }

  onAudioLoading = (status) => {
    this.props.dispatch(trailerUpdateLoading(status));
  };

  /**
   * @method onEnd
   * @description It triggers the trailerPause action so the button icon changes back to play
   * @memberOf TrailerEvents
   */
  onEnd = async () => {
    this.props.dispatch(trailerEnd());
    trailerController.tryPause();
  };

  render() {
    return null;
  }
}

function mapStateToProps({ trailerPlayer, activePlaylist }) {
  return {
    autoPlayList: activePlaylist.episodesList,
    loading: trailerPlayer.loading,
    playerTime: trailerPlayer.currentTime,
  };
}

export default connect(mapStateToProps)(TrailerEvents);
