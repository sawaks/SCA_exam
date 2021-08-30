import * as mainPlayer from 'components/Player/AudioPlayer/player';
import * as liveStreamPlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import * as trailerPlayer from 'components/Trailer/player/trailerController';
import { AUDIO_PLAY, AUDIO_UPDATE_SOURCE } from 'store/actions/audio-player';
import { LIVE_STREAM_PLAY, LIVE_STREAM_UPDATE_SOURCE } from 'store/actions/live-stream-player';
import { TRAILER_PLAY, TRAILER_UPDATE_SOURCE } from 'store/actions/trailer-player';

// eslint-disable-next-line no-unused-vars
const playersOrchestrator = store => next => (action) => {
  const triggersMainPlayerStop = [TRAILER_UPDATE_SOURCE, TRAILER_PLAY, LIVE_STREAM_PLAY, LIVE_STREAM_UPDATE_SOURCE];
  if (triggersMainPlayerStop.includes(action.type)) {
    mainPlayer.tryPause();
    mainPlayer.reset();
  }

  const triggersLiveStreamStop = [TRAILER_UPDATE_SOURCE, TRAILER_PLAY, AUDIO_UPDATE_SOURCE, AUDIO_PLAY];
  if (triggersLiveStreamStop.includes(action.type)) {
    liveStreamPlayer.tryPause();
    liveStreamPlayer.reset();
  }

  const triggersTrailerPlayerStop = [AUDIO_UPDATE_SOURCE, AUDIO_PLAY, LIVE_STREAM_PLAY, LIVE_STREAM_UPDATE_SOURCE];
  if (triggersTrailerPlayerStop.includes(action.type)) {
    trailerPlayer.tryPause();
  }

  next(action);
};

export default playersOrchestrator;
