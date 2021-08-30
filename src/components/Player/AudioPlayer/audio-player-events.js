import Logger from 'utilities/helpers/logger';

const eventHandlers = {};

export const events = {
  AUDIO_LOADING: 'audio_loading',
  DURATION_UPDATE: 'duration_update',
  END: 'end',
  ERROR: 'error',
  PAUSE: 'pause',
  PLAY: 'play',
  PLAYBACK_UPDATE: 'playback_update',
  PLAYING: 'playing',
  RESET: 'reset',
  SEEKED: 'seeked',
  SOURCE_UPDATE: 'source_update',
  TIME_UPDATE: 'time_update',
};

export function subscribe(event, handler) {
  // The handler is added to the array of handlers for the event
  const handlers = eventHandlers[event] || [];
  handlers.push(handler);
  eventHandlers[event] = handlers;
}

export function unsubscribe(event, handler) {
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

export function triggerEvent(event, data = null) {
  const handlers = eventHandlers[event];

  if (!handlers || handlers.length < 1) {
    return;
  }

  Logger.debug(`Player ${event}`);
  handlers.forEach(handler => handler(data));
}
