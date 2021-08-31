import moment from 'moment';

/**
 * @method convertSecondsToMinutes
 * @description converts seconds to minutes and rounds the minutes up to the next largest integer
 * @param {number} seconds
 * @example 310s becomes 5
 */
export function convertSecondsToMinutes(seconds) {
  return Math.ceil(seconds / 60);
}

/**
 * @method calculateAge
 * @description calculate age from the a given date of birth
 * @param {string} date - ISO 8601 date
 * @example 10/10/1980 return 40
 */
export function calculateAge(dob) {
  return moment().diff(dob, 'years');
}

/**
 * @method convertDate
 * @description converts ISO 8601 dates to human friendly format
 * @param {string} date - ISO 8601 date
 * @example 2018-10-15T08:40:45Z becomes 15 Oct 2018
 */
export function convertDate(date) {
  if (date) {
    return moment(date)
      .format('D MMM YY');
  }
  return '';
}

const padZero = digit => `${digit < 10 ? '0' : ''}${digit}`;

/**
 * @method formatSecondsToTime
 * @description Time formatter that turns seconds into h:mm:ss
 * @param {number} numSeconds
 * @example 360s becomes 06:00
 */
export function formatSecondsToTime(numSeconds) {
  const prefix = numSeconds < 0 ? '-' : '';
  const absNumSeconds = Math.abs(numSeconds);

  const hours = Math.floor(absNumSeconds / 3600);
  const minutes = Math.floor((absNumSeconds % 3600) / 60);
  const seconds = Math.floor(absNumSeconds) % 60;

  return hours > 0
    ? `${prefix}${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
    : `${prefix}${padZero(minutes)}:${padZero(seconds)}`;
}

export function timeAgo(date) {
  if (date) {
    return moment(date).fromNow();
  }
  return '';
}
