/**
 * @method getBrowser
 * @description Browser detect and return a string
 * * implementation got from: https://developer.mozilla.org/en-US/docs/Web/utilities/api/Window/navigator
 * @returns {string} browser name
 */
export default function getBrowser() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const { userAgent } = window.navigator;

  // The order matters here, and this may report false positives for unlisted browsers.
  // Some andriod devices returns linux on occasions.
  const platform = window.navigator.platform.toLocaleLowerCase();
  if (platform.includes('iphone') || platform.includes('ipad') || platform.includes('android') || platform.includes('linux')) {
    return 'Mobile';
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Mozilla Firefox';
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  }
  if (userAgent.indexOf('Opera') > -1) {
    return 'Opera';
  }
  if (userAgent.indexOf('Trident') > -1) {
    return 'Microsoft Internet Explorer';
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  }
  if (userAgent.indexOf('Edge') > -1) {
    return 'Microsoft Edge';
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  }
  return 'unknown';
}

/**
 * @method isSafariInPrivateMode
 * @description Detect private browsing on Safari.
 * Inspired by https://stackoverflow.com/questions/52759238/private-incognito-mode-detection-for-ios-12-safari
 * @returns {boolean}
 */

export function isSafariInPrivateMode() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  let isPrivate = false;
  const { userAgent } = window.navigator;

  /*
  edge browser has the user agent string that looks like the following:
  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931

  safari browser has the user agent string that looks like the following:
  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15

  therefore, to find safari browser, we need to make sure none of chrome or edge are in the user agent string
  */
  if (window.localStorage
    && userAgent.indexOf('Safari') > -1
    && userAgent.indexOf('Chrome') === -1
    && userAgent.indexOf('Edge') === -1) {
    // One-off check for weird sports 2.0 polyfill
    // This also impacts iOS Firefox and Chrome (newer versions), apparently
    // @see bglobe-js/containers/App.js:116
    if (window.safariIncognito) {
      isPrivate = true;
    } else {
      try {
        window.openDatabase(null, null, null, null);
      } catch (e) {
        isPrivate = true;
      }

      try {
        window.localStorage.setItem('test', 1);
      } catch (e) {
        isPrivate = true;
      }
    }

    if (typeof isPrivate === 'undefined') {
      isPrivate = false;
      window.localStorage.removeItem('test');
    }
  }
  return isPrivate;
}

/**
 * @method isEdgeInPrivateMode
 * @description Detect private browsing on Edge.
 * Inspired by https://codepen.io/fadupla/pen/EWxKRW
 * @returns {boolean}
 */
export function isEdgeInPrivateMode() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  let isPrivate = false;
  const { userAgent } = window.navigator;

  if (userAgent.indexOf('Edge') > -1) {
    if (!window.indexedDB) {
      isPrivate = true;
    }

    if (typeof isPrivate === 'undefined') {
      isPrivate = false;
    }
  }

  return isPrivate;
}
