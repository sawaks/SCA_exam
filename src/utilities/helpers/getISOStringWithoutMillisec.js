/**
 * @function getISOStringWithoutMillisec
 * @description returns ISO String data without millisecinds
 * @param {Date} dateTime
 * @example getISOStringWithoutMillisec(new Date())
 * @returns "2019-08-22T02:35:15Z"
 */

export default function getISOStringWithoutMillisec(dateTime) {
  let formattedDate = dateTime.toISOString().split('.')[0];
  formattedDate = `${formattedDate}Z`;
  return formattedDate;
}
