import React from 'react';
import GlobalStyles from 'src/styling/global';
import BrowserDetection from './BrowserDetection';

/**
 * @method Global
 * @description All of these components need to survive across
 * page navigation. The next _app.js component renders them for us.
 * NOTE: Please do not turn this into a PureComponent as it will prevent updates
 * for the withRouter HOC to underlying components. I repeat, DO NOT USE PURECOMPONENT.
 * Thank you 🙂.
 * @returns Component
 */
export default function Global() {
  return (
    <>
      <GlobalStyles />
      <BrowserDetection />
    </>
  );
}

