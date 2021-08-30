import React from 'react';
import Loading from 'components/Loading';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, withKnobs } from '@storybook/addon-knobs';

export default {
  component: Loading,
  title: 'Loading',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

export const LoadingState = () => (
  <Loading
    loading={boolean('Loading', true)}
    render={() => (
      // eslint-disable-next-line react/no-unescaped-entities
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur, consectetur cupiditate, eos error </h1>
    )}
  />
);

