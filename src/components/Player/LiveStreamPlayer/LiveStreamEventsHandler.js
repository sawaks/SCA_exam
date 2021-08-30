import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { liveStreamPause, liveStreamPlay, liveStreamPlayerLoaded, liveStreamUpdateLoading, updateLiveStreamSource, liveStreamReset } from 'store/actions/live-stream-player';
import { unsubscribePlayerOverlay } from 'store/actions/now-playing';
import { events, subscribe, unsubscribe } from './live-stream-events';

function LiveStreamEventsHandler() {
  const dispatch = useDispatch();

  const onPlay = () => {
    dispatch(liveStreamPlay());
  };

  const onPause = () => {
    dispatch(liveStreamPause());
  };

  const onError = () => {
    dispatch(liveStreamUpdateLoading(false));
  };

  const onSourceUpdate = (currentSource) => {
    dispatch(updateLiveStreamSource(currentSource));
  };

  const onAudioLoading = (status) => {
    dispatch(liveStreamUpdateLoading(status));
  };

  const onReset = () => {
    dispatch(liveStreamReset());
    dispatch(unsubscribePlayerOverlay());
  };

  useEffect(() => {
    subscribe(events.PLAY, onPlay);
    subscribe(events.PAUSE, onPause);
    subscribe(events.SOURCE_UPDATE, onSourceUpdate);
    subscribe(events.ERROR, onError);
    subscribe(events.AUDIO_LOADING, onAudioLoading);
    subscribe(events.RESET, onReset);
    dispatch(liveStreamPlayerLoaded());

    return () => {
      // unsubscribe(events.PLAY_INIT, onPlayInit);
      unsubscribe(events.PLAY, onPlay);
      unsubscribe(events.PAUSE, onPause);
      unsubscribe(events.SOURCE_UPDATE, onSourceUpdate);
      unsubscribe(events.ERROR, onError);
      unsubscribe(events.AUDIO_LOADING, onAudioLoading);
      unsubscribe(events.RESET, onReset);
    };
  }, []);

  return null;
}

export default LiveStreamEventsHandler;
