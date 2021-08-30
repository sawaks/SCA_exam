import React from 'react';
import { storiesOf } from '@storybook/react';
import NextUI from './index';

storiesOf('NextUI Track', module)
  .addWithJSX('default', () => (
    <NextUI
      className=""
      onClick={() => {}}
    />
  ))
  .addWithJSX('withTheming', () => (
    <NextUI
      className=""
      withTheming
      onClick={() => {}}
    />
  ));
