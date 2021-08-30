import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs';
import StepsButton from './index';

export default {
  component: StepsButton,
  title: 'Steps Button',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

export const Default = () => (
  <StepsButton step={text('Step', '01')} />
);
