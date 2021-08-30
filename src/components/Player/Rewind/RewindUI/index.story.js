import React from 'react';
import { storiesOf } from '@storybook/react';
import RewindUI from './index';

storiesOf('RewindUI Track', module)
  .addWithJSX('default', () => (
    <RewindUI
      className=""
      onClick={() => {}}
    />
  ))
  .addWithJSX('withTheming', () => (
    <RewindUI
      className=""
      withTheming
      onClick={() => {}}
    />
  ));
