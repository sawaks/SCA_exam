import Logger from 'utilities/helpers/logger';

/**
 * addToDataLayer
 * Pushes an object to the dataLayer array on window.scaGtmDataLayer
 * @param {object} event
 * @example addToDataLayer({ event: 'gtm.signup' })
 */
export default function addToDataLayer(event) {
  const dataLayer = window?.scaGtmDataLayer || [];
  dataLayer.push(event);
  Logger.debug('dataLayer: ', window.scaGtmDataLayer);
}
