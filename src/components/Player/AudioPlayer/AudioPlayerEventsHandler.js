import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { handleNextEpisode } from 'store/actions/active-playlist';
import {
  audioEnd,
  audioPause,
  audioPlay,
  audioPlayerLoaded,
  audioReset,
  audioSeeked,
  audioUpdateCurrentTime,
  audioUpdateDuration,
  audioUpdateLoading,
  audioUpdatePlaybackRate,
  audioUpdateSource,
} from 'store/actions/audio-player';
import { events, subscribe, unsubscribe } from './audio-player-events';
import * as player from './player';

function AudioPlayerEventsHandler() {
  const dispatch = useDispatch();

  const enableAutoPlay = useSelector(state => state.activePlaylist.autoplayEnabled, shallowEqual);
  const autoPlayList = useSelector(state => state.activePlaylist.episodesList, shallowEqual);

  const onPlay = () => {
    dispatch(audioPlay());
  };

  const onPause = () => {
    dispatch(audioPause());
  };

  const onUpdatePlaybackRate = (playbackRate) => {
    dispatch(audioUpdatePlaybackRate(playbackRate));
  };

  const onError = () => {
    dispatch(audioUpdateLoading(false));
  };

  const onTimeUpdate = (currentTime) => {
    dispatch(audioUpdateCurrentTime(currentTime));
  };

  const onTimeSeeked = () => {
    dispatch(audioSeeked());
  };

  const onDurationUpdate = (duration) => {
    dispatch(audioUpdateDuration(duration));
  };

  const onSourceUpdate = ({ currentSource, playheadPosition }) => {
    dispatch(audioUpdateSource(currentSource, playheadPosition));
    dispatch(audioUpdatePlaybackRate(1));
  };

  const onAudioLoading = (status) => {
    dispatch(audioUpdateLoading(status));
  };

  const onReset = () => {
    dispatch(audioReset());
  };

  const onEnd = async () => {
    if (enableAutoPlay && autoPlayList) {
      dispatch(audioEnd());
      const getNextEpisode = await dispatch(handleNextEpisode());
      if (!getNextEpisode) {
        player.tryPause();
      }
    } else {
      player.tryPause();
    }
  };

  useEffect(() => {
    subscribe(events.PLAY, onPlay);
    subscribe(events.PAUSE, onPause);
    subscribe(events.PLAYBACK_UPDATE, onUpdatePlaybackRate);
    subscribe(events.SOURCE_UPDATE, onSourceUpdate);
    subscribe(events.TIME_UPDATE, onTimeUpdate);
    subscribe(events.SEEKED, onTimeSeeked);
    subscribe(events.DURATION_UPDATE, onDurationUpdate);
    subscribe(events.END, onEnd);
    subscribe(events.ERROR, onError);
    subscribe(events.AUDIO_LOADING, onAudioLoading);
    subscribe(events.RESET, onReset);
    dispatch(audioPlayerLoaded());

    return () => {
      unsubscribe(events.PLAY, onPlay);
      unsubscribe(events.PAUSE, onPause);
      unsubscribe(events.PLAYBACK_UPDATE, onUpdatePlaybackRate);
      unsubscribe(events.SOURCE_UPDATE, onSourceUpdate);
      unsubscribe(events.TIME_UPDATE, onTimeUpdate);
      unsubscribe(events.SEEKED, onTimeSeeked);
      unsubscribe(events.DURATION_UPDATE, onDurationUpdate);
      unsubscribe(events.END, onEnd);
      unsubscribe(events.ERROR, onError);
      unsubscribe(events.AUDIO_LOADING, onAudioLoading);
      unsubscribe(events.RESET, onReset);
    };
  }, []);

  return null;
}

export default AudioPlayerEventsHandler;
