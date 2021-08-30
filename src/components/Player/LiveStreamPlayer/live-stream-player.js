import Logger from 'utilities/helpers/logger';
import flow from 'lodash/flow';
import { appendEmailSha256, appendKruxSegs, appendAdswizzSourceUrl } from '../../../utilities/helpers/audioUrl';
import { events, triggerEvent } from './live-stream-events';

let currentSource;
let hlsLoader;
let audio = null;
if (process.browser) {
  audio = new Audio();
  window.liveStreamAudioElement = audio;
}

// wrapping functions with this, so nothing is done when there is no audio
const execute = func => (audio ? func() : () => {});

function onAudioPause() {
  triggerEvent(events.PAUSE, currentSource);
  hlsLoader.detachAndDestroy();
}

function onCanPlay() {
  if (audio.readyState > 2) {
    triggerEvent(events.AUDIO_LOADING, false);
  }
}

function isPlaying() {
  return audio && audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
}

export function tryPause() {
  return execute(() => {
    if (isPlaying()) {
      audio.currentTime = 0;
      audio.pause();
    }
  });
}

function onAudioEnd() {
  tryPause();
  triggerEvent(events.END, currentSource);
}

function initialiseAudio() {
  audio.preload = 'none';
  audio.onpause = onAudioPause;
  audio.onended = onAudioEnd;
  audio.oncanplay = onCanPlay;
}

execute(initialiseAudio);

function doPlay() {
  // This will wrap audio.play() in a Promise in case the
  // value returned from the function is undefined, as for example
  // is the case with IE11.
  const play = Promise.resolve(audio.play());
  play
    .then(() => {
      triggerEvent(events.PLAY, currentSource);
      // gracefulUnMute();

      // this exception for iOS, also works for chrome and firefox.
      // in iOS (player not loaded yet) safari reset audio.currentTime = 0 and start playing an episode from the beginnig
      // in that case grabbing the value from playheadPosition but all other cases audio.currentTime returns the correct value.
      audio.currentTime = audio.currentTime > 0 ? audio.currentTime : 0;
      triggerEvent(events.AUDIO_LOADING, false);
    })
    .catch((e) => {
      Logger.error('play error:', e);
      triggerEvent(events.ERROR, e);
    });
}

async function resetAndLoadHLS() {
  if (!hlsLoader) {
    hlsLoader = await import('./hlsLoader');
  }
  try {
    await hlsLoader.detachAndDestroy();
    hlsLoader.initialise(audio, currentSource, doPlay);
    doPlay();
  } catch (e) {
    triggerEvent(events.ERROR, e);
  }
}

export function tryPlay() {
  return execute(() => {
    triggerEvent(events.AUDIO_LOADING, true);
    resetAndLoadHLS();
  });
}

export function updateSource(source, emailSha256) {
  execute(() => {
    // Track update requested but player is already using the same source
    if (currentSource === source) {
      triggerEvent(events.AUDIO_LOADING, false);
      return;
    }

    const isPaused = audio.paused;
    // eslint-disable-next-line no-multi-assign
    audio.src = currentSource = flow(appendEmailSha256, appendAdswizzSourceUrl, appendKruxSegs)(source, emailSha256);
    audio.currentTime = 0;

    if (!isPaused && audio.paused) {
      // Trigger a pause event, caused by audio source change
      triggerEvent(events.PAUSE, currentSource);
    }

    triggerEvent(events.SOURCE_UPDATE, currentSource);
    tryPlay();
  });
}

export function reset() {
  execute(() => {
    audio.currentTime = 0;
    audio.src = '';
    triggerEvent(events.RESET);
  });
}
