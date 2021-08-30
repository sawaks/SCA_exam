
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { number, withKnobs } from '@storybook/addon-knobs';
import FavouriteButton from '.';

export default {
  component: FavouriteButton,
  title: 'Favourite Button',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

export const Default = () => (
  <FavouriteButton
    onFavouriteClick={() => 'test'}
    onUnfavouriteClick={() => 'test'}
    maxWidthMobile={`${number('Min Width (px)', 171)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 194)}px`}
  />
);

export const Active = () => (
  <FavouriteButton
    isFav
    onFavouriteClick={() => 'test'}
    onUnfavouriteClick={() => 'test'}
    maxWidthMobile={`${number('Min Width (px)', 171)}px`}
    maxWidthDesktop={`${number('Max Width (px)', 194)}px`}
  />
);

