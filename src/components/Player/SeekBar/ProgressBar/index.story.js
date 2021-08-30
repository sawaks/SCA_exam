import React from 'react';
import { storiesOf } from '@storybook/react';
import SeekBarUI from './index';

const props = {
  duration: 2000,
  currentTime: 664,
  onMouseDown: () => {},
  onTouchStart: () => {},
  onSeek: () => {},
  onReplay: () => {},
  onSkip: () => {},
  offSet: 10,
  reference: () => {},
  className: '',
};

storiesOf('Player Seek Bar', module)
  .addWithJSX('default', () => (
    <SeekBarUI {...props} withTheming={false} />
  ))
  .addWithJSX('m, paused', () => (
    <SeekBarUI {...props} withTheming />
  ));
