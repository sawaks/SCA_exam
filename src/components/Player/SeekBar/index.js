import * as player from 'components/Player/AudioPlayer/player';
import ProgressBar from 'components/Player/SeekBar/ProgressBar';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { events, unsubscribe, subscribe } from '../AudioPlayer/audio-player-events';

class SeekBar extends PureComponent {
  static propTypes = {
    analyticsData: PropTypes.shape({
      showName: PropTypes.string,
      showCategory: PropTypes.string,
      season: PropTypes.number,
      episodeNumber: PropTypes.number,
      streamingUrl: PropTypes.string,
    }),
    audioUrl: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    currentTime: PropTypes.number,
    duration: PropTypes.number.isRequired,
    music: PropTypes.bool,
    onClickCallback: PropTypes.func,
    variant: PropTypes.oneOf(['xs', 's', 'm']).isRequired,
    withTheming: PropTypes.bool,
    withBorder: PropTypes.bool,
    withBackground: PropTypes.bool,
    withHandle: PropTypes.bool,
  };

  static defaultProps = {
    analyticsData: null,
    currentTime: 0,
    music: false,
    onClickCallback: null,
    withBackground: false,
    withHandle: false,
    withTheming: false,
    withBorder: false,
  };

  state = {
    offSet: 0,
    inSeekMode: false,
    temporarySeekTime: 0,
    musicPopupVisible: false,
  };

  componentDidMount() {
    subscribe(events.SEEKED, this.onAudioSeeked);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.audioUrl !== this.props.audioUrl) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ musicPopupVisible: false });
    }
  }

  componentWillUnmount() {
    unsubscribe(events.SEEKED, this.onAudioSeeked);
  }

  onAudioSeeked = () => {
    // Seek mode is turned off when audio resumes playing
    this.setState({ inSeekMode: false });
  };

  updatePlayerTime = (newSeekTime) => {
    const { currentTime, analyticsData } = this.props;
    let event;
    if (newSeekTime > currentTime) {
      event = gtm.playerScrubForward;
    } else {
      event = gtm.playerScrubBack;
    }
    addToDataLayer({
      event,
      ...analyticsData,
    });
    player.setCurrentTime(newSeekTime);
  };

  handleOnSeek = (e) => {
    const { loading, onClickCallback, music } = this.props;

    if (music) {
      this.setState({ musicPopupVisible: true });
      return;
    }

    if (onClickCallback) {
      onClickCallback();
    }

    // player is not loading
    if (!loading) {
      const newSeekTime = this.calcPosition(e);
      this.setState({
        inSeekMode: true,
        temporarySeekTime: newSeekTime,
      });
      this.updatePlayerTime(newSeekTime);
    }
  };

  handleCloseMusicPopup = (e) => {
    e.stopPropagation();
    this.setState({ musicPopupVisible: false });
  };

  handleReplay = () => {
    player.seek(-10);
  };

  handleSkip = () => {
    player.seek(10);
  };

  handleOnMouseDown = (e) => {
    const { loading } = this.props;
    // player is not loading
    if (!loading) {
      e.preventDefault();
      this.setState({
        inSeekMode: true,
        temporarySeekTime: this.props.currentTime,
      });
      window.addEventListener('mousemove', this.elementDrag);
      window.addEventListener('mouseup', this.closeDragElement);
      this.pauseEvent(e);
    }
  };

  handleOnTouchStart = (e) => {
    const { loading } = this.props;

    // player is not loading
    if (!loading) {
      this.setState({
        inSeekMode: true,
        temporarySeekTime: this.props.currentTime,
      });
      window.addEventListener('touchmove', this.touchMove);
      window.addEventListener('touchend', this.closeTouchMove);
      window.addEventListener('touchcancel', this.closeTouchMove);
      this.pauseEvent(e);
    }
  };

  touchMove = (e) => {
    const { onClickCallback } = this.props;
    if (onClickCallback) {
      onClickCallback();
    }

    if (this.isNotTouchEvent(e)) {
      this.closeTouchMove(e);
      return;
    }

    this.setState({ temporarySeekTime: this.calcPosition(e) });
  };

  elementDrag = (e) => {
    e.preventDefault();
    this.setState({ temporarySeekTime: this.calcPosition(e) });
  };

  closeDragElement = (e) => {
    window.removeEventListener('mousemove', this.elementDrag);
    window.removeEventListener('mouseup', this.closeDragElement);
    this.updatePlayerTime(this.calcPosition(e));
  };

  closeTouchMove = (e) => {
    window.removeEventListener('touchmove', this.touchMove);
    window.removeEventListener('touchend', this.closeTouchMove);
    this.updatePlayerTime(this.calcPosition(e));
  };

  calcPosition = (e) => {
    const rect = this.slider.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const mouseX = e.clientX ? e.clientX : e.changedTouches[0].pageX;
    let dLeft = mouseX - (rect.left + scrollX);
    dLeft = Math.max(dLeft, 0);
    dLeft = Math.min(dLeft, rect.width);
    const offset = (dLeft / rect.width) * 100;
    // Offset controls the seekbar handle position
    this.setState({ offSet: offset });

    const { duration } = this.props;
    return (duration * offset) / 100;
  };

  isNotTouchEvent = e => e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);

  pauseEvent = (e) => {
    e.stopPropagation();
  };

  render() {
    const { duration, currentTime, withTheming, withBackground, withHandle, withBorder, variant, loading, music } = this.props;
    const { inSeekMode, temporarySeekTime, offSet, musicPopupVisible } = this.state;
    let currentProgress;
    if (inSeekMode) {
      currentProgress = temporarySeekTime;
    } else if (loading) {
      currentProgress = 0;
    } else {
      currentProgress = currentTime;
    }

    return (
      <ProgressBar
        currentProgress={currentProgress}
        duration={duration}
        inSeekMode={inSeekMode}
        music={music}
        musicPopupVisible={musicPopupVisible}
        offSet={offSet}
        onCloseMusicPopup={this.handleCloseMusicPopup}
        onMouseDown={this.handleOnMouseDown}
        onReplay={this.handleReplay}
        onSeek={this.handleOnSeek}
        onSkip={this.handleSkip}
        onTouchStart={this.handleOnTouchStart}
        reference={(node) => { this.slider = node; }}
        variant={variant}
        withBackground={withBackground}
        withBorder={withBorder}
        withHandle={withHandle}
        withTheming={withTheming}
      />
    );
  }
}

function mapStateToProps({ audioPlayer }) {
  return {
    audioUrl: audioPlayer.sourceUrl,
    currentTime: audioPlayer.currentTime,
    duration: audioPlayer.duration,
    loading: audioPlayer.loading,
  };
}

export default connect(mapStateToProps)(SeekBar);
