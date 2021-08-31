import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getBrowser from 'utilities/helpers/browser';
import { detectBrowser } from 'store/actions/device';

function BrowserDetection() {
  const dispatch = useDispatch();

  useEffect(() => {
    const browser = getBrowser();
    dispatch(detectBrowser(browser));
  }, []);

  return null;
}

export default BrowserDetection;
