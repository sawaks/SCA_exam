import isEmpty from 'lodash/isEmpty';

/**
 * @method encrypt
 * @description obfuscate the audio url due to commercial reasons
 * @param {string} url
 * @returns encrypted url
 */
export function encrypt(url) {
  if (isEmpty(url)) {
    return '';
  }
  return Buffer.from(url).toString('base64');
}

export function decrypt(url) {
  if (isEmpty(url)) {
    return '';
  }
  return Buffer.from(url, 'base64').toString();
}

