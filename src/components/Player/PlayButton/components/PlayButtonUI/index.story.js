import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayButtonUI from './index';

storiesOf('Play button', module)
  .addWithJSX('l, paused', () => (
    <PlayButtonUI
      className=""
      isPlaying={false}
      isLoading={false}
      variant="l"
      onClick={() => {}}
    />
  ))
  .addWithJSX('m, playing', () => (
    <PlayButtonUI
      className=""
      isPlaying
      isLoading={false}
      variant="m"
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
  ))
  .addWithJSX('xs, playing', () => (
    <PlayButtonUI
      className=""
      isPlaying
      isLoading={false}
      variant="xs"
      onClick={() => {}}
    />
  ))
  .addWithJSX('xl, loading', () => (
    <PlayButtonUI
      className=""
      isPlaying={false}
      isLoading
      variant="xl"
      onClick={() => {}}
    />
  ));
