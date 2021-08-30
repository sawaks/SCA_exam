/**
 * @method episodeComplete
 * @description if the playback track position completed 95% or more it returns true
 * @description  if the playback remains less than 30 seconds to be completed, it also return true
 * @param {number, number} // playhead position and duration in Seconds
 * @returns {boolean}
 */

import percentage from 'utilities/helpers/percentage';

export default function episodeComplete(playheadSeconds, durationSeconds) {
  if (playheadSeconds === 0 && durationSeconds === 0) return false;
  const percentComplete = percentage(Math.round(playheadSeconds), Math.round(durationSeconds)) >= 95;
  const lessThanThirtyComplete = (Math.round(durationSeconds) - Math.round(playheadSeconds)) <= 30;
  const completed = percentComplete || lessThanThirtyComplete;

  return completed;
}
