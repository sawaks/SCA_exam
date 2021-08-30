import React from 'react';
import { storiesOf } from '@storybook/react';
import ClosePlayerUI from './index';

storiesOf('Fast Forward Track', module)
  .addWithJSX('default', () => (
    <ClosePlayerUI
      className=""
      onClick={() => {}}
    />
  ))
  .addWithJSX('withTheming', () => (
    <ClosePlayerUI
      className=""
      withTheming
      onClick={() => {}}
    />
  ));
