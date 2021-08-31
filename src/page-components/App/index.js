import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { any, func, objectOf } from 'prop-types';
import makeStore from 'store';
import BackgroundGradient from 'shared-components/Layout/BackgroundGradient';
import theme from 'src/styling/theme';
import Global from './Global';

const store = makeStore();

const App = ({ Component, pageProps }) => (
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

App.propTypes = {
  Component: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: objectOf(any).isRequired,
};

export default App;
