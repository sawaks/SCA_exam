import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import PlayPreviewUI from './PlayPreviewUI';

export default {
  component: PlayPreviewUI,
  title: 'Play Preview Button',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

export const Default = () => (
  <PlayPreviewUI
    text={text('Text', 'Play Preview')}
    progress={number('Progress (%)', 0)}
    playing={boolean('Playing', false)}
    onPlayClick={() => {}}
    onStopClick={() => {}}
    maxWidthMobile={`${number('Min Width (px)', 171)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 194)}px`}
  />
);
