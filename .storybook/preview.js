import React from 'react';
import GlobalStyle from '../src/styling/global';
import configureStore from 'redux-mock-store';
import theme from '../src/styling/theme';
import { Flex } from '@rebass/grid';
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { addParameters } from '@storybook/react';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addParameters({
    backgrounds: {
        default: 'Dark',
        values: [
            {
                name: 'Dark',
                value: '#201f20'
            },
            {
                name: 'Gray',
                value: 'lightgray'
            },
        ],
    }
});

const mockStore = configureStore([]);
const store = mockStore({ });

export const decorators = [
  (Story) => (
      <Flex
          justifyContent="center"
          flexDirection="column"
          width={1}
          mx="auto"
          py={24}
          px={[0, 24]}
      >
        <GlobalStyle />
          <ThemeProvider theme={theme}>
              <Provider store={store}>
                  <Story />
              </Provider>
          </ThemeProvider>
      </Flex>
  ),
];
