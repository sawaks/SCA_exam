import isEmpty from 'lodash/isEmpty';
import { events, triggerEvent } from './audio-player-events';

let currentSource;
let audio = null;
if (process.browser) {
  audio = new Audio();
  window.audioElement = audio;
}

// wrapping functions with this, so nothing is done when there is no audio
const execute = func => (audio ? func() : () => {});

function isPlaying() {
  return audio && audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
}

function addOmnyCustomSource(source) {
  if (isEmpty(source)) {
    return '';
  }
  return `${source}?utm_source=CustomPlayer3`;
}

function onAudioSeeked() {
  triggerEvent(events.SEEKED, Number(audio.currentTime.toFixed(0)));
}

function onAudioPause() {
  triggerEvent(events.PAUSE, currentSource);
}

function onAudioDurationChange() {
  triggerEvent(events.DURATION_UPDATE, audio.duration);
}

function onAudioTimeUpdate() {
  triggerEvent(events.TIME_UPDATE, audio.currentTime);
}

function onAudioEnd() {
  triggerEvent(events.END, currentSource);
}

function resetPlaybackRate() {
  audio.playbackRate = 1;
}

function onCanPlay() {
  triggerEvent(events.AUDIO_LOADING, false);
}

function initialiseAudio() {
  audio.preload = 'none';
  audio.onpause = onAudioPause;
  audio.ondurationchange = onAudioDurationChange;
  audio.ontimeupdate = onAudioTimeUpdate;
  audio.onended = onAudioEnd;
  audio.onseeked = onAudioSeeked;
  audio.oncanplay = onCanPlay;
}

execute(initialiseAudio);

export function changePlaybackRate() {
  let playbackRate;
  switch (audio.playbackRate) {
    case 1:
      playbackRate = 1.5;
      break;
    case 1.5:
      playbackRate = 2;
      break;
    case 2:
      playbackRate = 1;
      break;
    default:
      break;
  }
  audio.playbackRate = playbackRate;
  triggerEvent(events.PLAYBACK_UPDATE, playbackRate);
}

function doPlay(playheadPosition) {
  // This will wrap audio.play() in a Promise in case the
  // value returned from the function is undefined, as for example
  // is the case with IE11.
  const play = Promise.resolve(audio.play());

  play
    .then(() => {
      triggerEvent(events.PLAY, currentSource);
      resetPlaybackRate();
      audio.currentTime = playheadPosition || audio.currentTime;
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Play error:', e);
      triggerEvent(events.ERROR, e);
    });
}

export function tryPlay(playheadPosition = 0) {
  return execute(() => {
    if (audio.currentTime <= 0) {
      triggerEvent(events.AUDIO_LOADING, true);
    }
    // audio.currentTime = audio.currentTime > 0 ? audio.currentTime : playheadPosition;
    doPlay(playheadPosition);
  });
}

export function tryPause() {
  return execute(() => {
    if (isPlaying()) {
      audio.pause();
    }
  });
}

export function updateSource(source, episodeId, playheadPosition = 0) {
  execute(() => {
    // Track update requested but player is already using the same source
    if (currentSource === source) {
      triggerEvent(events.AUDIO_LOADING, false);
      return;
    }
    triggerEvent(events.AUDIO_LOADING, true);

    const isPaused = audio.paused;
    const previousSource = currentSource;
    currentSource = addOmnyCustomSource(source);
    audio.src = currentSource;

    if (!isPaused && audio.paused) {
      // Trigger a pause event, caused by audio source change
      triggerEvent(events.PAUSE, currentSource);
    }

    triggerEvent(events.SOURCE_UPDATE, {
      previousSource,
      currentSource,
      episodeId,
      playheadPosition,
    });
    tryPlay(playheadPosition);
  });
}

export function seek(seconds) {
  execute(() => {
    const newCurrentTime = audio.currentTime + seconds;
    if (newCurrentTime >= 0 && newCurrentTime <= audio.duration) {
      audio.currentTime = newCurrentTime;
    }
  });
}

export function setCurrentTime(currentTime) {
  execute(() => {
    audio.currentTime = currentTime;
  });
}

export async function getDuration() {
  return audio ? audio.duration : 0;
}

export function reset() {
  execute(() => {
    audio.currentTime = 0;
    audio.src = '';
    triggerEvent(events.RESET);
  });
}
