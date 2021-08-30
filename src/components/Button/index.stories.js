// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import Button from 'components/Button';
import PlayIcon from 'components/Icons/play.svg';
import React from 'react';

export default {
  component: Button,
  title: 'Button',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

const ctaText = 'CALL TO ACTION';

export const Primary = () => (
  <Button
    variant="primary"
    text={text('Text', ctaText)}
    disabled={boolean('Inactive', false)}
    minWidthDesktop={`${number('Min Width (px)', 100)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 311)}px`}
  />
);

export const Secondary = () => (
  <Button
    variant="secondary"
    text={text('Text', ctaText)}
    minWidthDesktop={`${number('Min Width (px)', 100)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 311)}px`}
    disabled={boolean('Inactive', false)}
    icon={boolean('Icon', false) ? <PlayIcon /> : null}
    iconHighlighted={boolean('Icon Highlighted', true)}
  />
);

export const Tertiary = () => (
  <Button
    variant="tertiary"
    text={text('Text', ctaText)}
    minWidthDesktop={`${number('Min Width (px)', 100)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 311)}px`}
  />
);

export const Quinary = () => (
  <Button
    variant="quinary"
    text={text('Text', ctaText)}
    minWidthDesktop={`${number('Min Width (px)', 100)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 311)}px`}
  />
);

export const Submit = () => (
  <Button
    variant="primary"
    text={text('Text', ctaText)}
    submitting={boolean('Loading', true)}
    minWidthDesktop={`${number('Min Width (px)', 100)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 311)}px`}
  />
);

