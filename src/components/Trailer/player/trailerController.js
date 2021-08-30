import Logger from 'utilities/helpers/logger';

const noop = () => {
};
const isBrowser = process.browser || false;
const audio = isBrowser ? new Audio() : null;
const muteTimer = 20;
let currentSource;
let currentAudioTime = 0;

// wrapping functions with this, so nothing is done when there is no audio
const execute = func => (audio ? func() : noop());
const eventHandlers = {};

/**
 * Audio player events
 */
export const events = {
  /**
   * Raised when the player starts playing a file. The callback function receives the player sourceUrl
   */
  PLAY: 'play',
  /**
   * Raised when the audio has started playing, or resumed from pause. The callback function receives the player sourceUrl
   */
  PLAYING: 'playing',
  /**
   * Raised the first time a new source is attempted to be played. The callback function receives the player sourceUrl
   */
  PLAY_INIT: 'play_init',
  /**
   * Raised when the player is paused. The callback function receives the player sourceUrl
   */
  PAUSE: 'pause',
  /**
   * Raised when the player's current time is externally modified. The callback function receives the new position (number)
   */
  SEEKED: 'seeked',
  /**
   * Raised when the end of playback is reached. The callback function receives the player sourceUrl
   */
  END: 'end',
  /**
   * Raised when Internet Explorer begins looking for media data.
   */
  LOAD_START: 'load_start',
  /**
   * Raised when the sourceUrl has changed. The callback function receives an object: { previousSource, currentSource }
   */
  SOURCE_UPDATE: 'source_update',
  /**
   * Raised when the duration attribute is updated. The callback function receives the duration (number)
   */
  DURATION_UPDATE: 'duration_update',
  /**
   * Raised when there is progress downloading media data. The callback function receives progress percentage (number)
   */
  BUFFER_UPDATE: 'buffer_update',
  /**
   * Raised every second the playback position is updated. The callback function receives the current position (number)
   */
  TIME_UPDATE: 'time_update',
  /**
   * Raised when second the playback rate is updated. The callback function receives the current playback rate (number)
   */
  PLAYBACK_UPDATE: 'playback_update',
  /**
   * Raised when second the playback rate is updated. The callback function receives the current playback rate (number)
   */
  VOLUME_UPDATE: 'volume_update',
  /**
   * Raised when the player encounters error in playing media. The callback function receives the error object
   */
  ERROR: 'error',
  /**
   * Raised when the player is muted. The callback function receives the player sourceUrl
   */
  MUTE: 'mute',
  /**
   * Raised when the player is unmute. The callback function receives the player sourceUrl
   */
  UNMUTE: 'unmute',
  /**
   * Raised when the audio source loading.
   */
  AUDIO_LOADING: 'audio_loading',
};

/**
 * Unsubscribe from a player event
 * @param {string} event The event. Options available in the events object
 * @param {Function} handler Handler function
 */
export function on(event, handler) {
  // The handler is added to the array of handlers for the event
  const handlers = eventHandlers[event] || [];
  handlers.push(handler);
  eventHandlers[event] = handlers;
}

/**
 * Unsubscribe from a player event
 * @param {string} event The event. Options available in the events object
 * @param {Function} handler Handler function
 */
export function off(event, handler) {
  // The handler removed from the array of handlers for the event
  const handlers = eventHandlers[event] || [];
  const index = handlers.indexOf(handler);
  if (index !== -1) {
    handlers.splice(index, 1);
  } else {
    Logger.warn(`Handler for '${event}' not found`);
  }

  eventHandlers[event] = handlers;
}

/**
 * Raise an event
 * @param {string} event The event name. Options available in the events object
 * @param {Object} data The data to supply to the handler function
 */
function triggerEvent(event, data) {
  const handlers = eventHandlers[event];

  if (!handlers || handlers.length < 1) {
    return;
  }

  Logger.debug(`Player ${event}`);
  handlers.forEach(handler => handler(data));
}

function onAudioPlaying() {
  triggerEvent(events.PLAYING, currentSource);
}

function onAudioPause() {
  triggerEvent(events.PAUSE, currentSource);
}

function onAudioDurationChange() {
  triggerEvent(events.DURATION_UPDATE, audio.duration);
}

function onAudioTimeUpdate() {
  // This should trigger the event on every second change
  const newTime = audio.currentTime;
  if (currentAudioTime !== newTime) {
    currentAudioTime = newTime;
    triggerEvent(events.TIME_UPDATE, newTime);
  }
}

function onAudioEnd() {
  triggerEvent(events.END, currentSource);
}

function getVolume() {
  return Number(audio.volume.toFixed(2));
}

function initialiseAudio() {
  audio.preload = 'none';
  audio.onpause = onAudioPause;
  audio.onplaying = onAudioPlaying;
  audio.ondurationchange = onAudioDurationChange;
  audio.ontimeupdate = onAudioTimeUpdate;
  audio.onended = onAudioEnd;
}

execute(initialiseAudio);

function isPlaying() {
  return audio && audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
}

export function gracefulUnMute() {
  return execute(() => {
    const intervalId = setInterval(() => {
      const startingVolume = getVolume();
      if (startingVolume <= 0.9) {
        audio.volume = startingVolume + 0.1;
      }
      if (getVolume() === 1) {
        clearInterval(intervalId);
      }
    }, muteTimer);
  });
}

function doPlay() {
  // This will wrap audio.play() in a Promise in case the
  // value returned from the function is undefined, as for example
  // is the case with IE11.
  const play = Promise.resolve(audio.play());

  play
    .then(() => {
      triggerEvent(events.PLAY, currentSource);
      gracefulUnMute();

      // this exception for iOS, also works for chrome and firefox.
      // in iOS (player not loaded yet) safari reset audio.currentTime = 0 and start playing an episode from the beginnig
      // in that case grabbing the value from playheadPosition but all other cases audio.currentTime returns the correct value.
      audio.currentTime = audio.currentTime > 0 ? audio.currentTime : 0;
    })
    .catch((e) => {
      Logger.error('play error:', e);
      triggerEvent(events.ERROR, e);
    });
}

export function tryPlay() {
  return execute(() => {
    if (audio.currentTime <= 0) {
      triggerEvent(events.PLAY_INIT, currentSource);
    }
    doPlay();
  });
}

export function tryPause() {
  return execute(() => {
    if (isPlaying()) {
      audio.currentTime = 0;
      audio.pause();
    }
  });
}

export function updateSource(source) {
  triggerEvent(events.AUDIO_LOADING, true);
  execute(() => {
    const isPaused = audio.paused;
    const previousSource = currentSource;
    currentSource = source;
    audio.src = source;
    audio.currentTime = 0;

    if (!isPaused && audio.paused) {
      // Trigger a pause event, caused by audio source change
      triggerEvent(events.PAUSE, currentSource);
    }

    triggerEvent(events.SOURCE_UPDATE, {
      previousSource,
      currentSource,
    });
    tryPlay();
  });
}
