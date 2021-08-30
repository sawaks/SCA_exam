import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayButtonUI from './index';

storiesOf('Play button', module)
  .addWithJSX('l, playing', () => (
    <PlayButtonUI
      className=""
      isPlaying
      isLoading={false}
      variant="m"
      onClick={() => {}}
    />
  ))
  .addWithJSX('m, paused', () => (
    <PlayButtonUI
      className=""
      isPlaying={false}
      isLoading={false}
      variant="l"
      onClick={() => {}}
    />
  ))
  .addWithJSX('s, loading', () => (
    <PlayButtonUI
      className=""
      isPlaying={false}
      isLoading
      variant="s"
      onClick={() => {}}
    />
  ));
