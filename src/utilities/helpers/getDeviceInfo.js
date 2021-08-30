import browserDetect from 'browser-detect';
import { OS_TYPE } from '../constants';

export function getOS() {
  const { userAgent } = window.navigator;
  const { platform } = window.navigator;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = 'noOS';

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = OS_TYPE.MAC_OS;
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = OS_TYPE.IOS;
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = OS_TYPE.WINDOWS;
  } else if (/Huawei/.test(userAgent)) {
    os = OS_TYPE.HUAWEI;
  } else if (/Android/.test(userAgent)) {
    os = OS_TYPE.ANDROID;
  } else if (!os && /Linux/.test(platform)) {
    os = OS_TYPE.LINUX;
  }

  return os;
}

// Checking screen is not recommended as it does not cater for guys with separate monitors
// function getScreenDimension() {
//   if (window.screen.width && window.screen.height) {
//     return `${window.screen.width}-${window.screen.height}`;
//   }
//   return 'noScreenDimension';
// }

export function testTouchSupport() {
  if ('ontouchstart' in window || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints > 0)) {
    return 'TD';
  }
  return 'nonTD';
}

export function getHardwareConcurrency() {
  if (navigator.hardwareConcurrency) {
    return `${navigator.hardwareConcurrency}`;
  }
  return 'noHC';
}

export function testNotificationsSupport() {
  const browser = browserDetect(window.navigator.userAgent);
  if (browser.name === 'safari' || (browser.mobile && browser.os.includes('OS'))) {
    return false;
  }

  return true;
}

export function isMobile() {
  const browser = browserDetect(window.navigator.userAgent);
  return browser.mobile;
}

function getDeviceInfo() {
  if (window && navigator) {
    return `${getOS()}-${getHardwareConcurrency()}-${testTouchSupport()}`;
  }
  return null;
}

export default getDeviceInfo;
