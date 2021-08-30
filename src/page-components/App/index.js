import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { objectOf, shape, func } from 'prop-types';
import makeStore from 'store';
import BackgroundGradient from 'components/Layout/BackgroundGradient';
import theme from 'styles/theme';
// eslint-disable-next-line import/no-extraneous-dependencies
// import whyDidYouRender from '@welldone-software/why-did-you-render';
import Global from './Global';

// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     // include: [/SeekBar/],
//   });
// }
const store = makeStore();

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Service worker registration failed, error:', error);
        });
    }
    // expose store when run in Cypress
    if (window.Cypress) {
      window.store = store;
    }
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    // Then we set the value in the --vh custom property to the root of the document
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <Global />
        <BackgroundGradient />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: func.isRequired,
  pageProps: objectOf(shape).isRequired,
};

export default App;
