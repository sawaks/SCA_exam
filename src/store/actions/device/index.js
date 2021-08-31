export const DETECT_BROWSER = 'DETECT_BROWSER';
export const DETECT_DEVICE = 'DETECT_DEVICE';

export const detectBrowser = browser => ({
  type: DETECT_BROWSER,
  browser,
});
