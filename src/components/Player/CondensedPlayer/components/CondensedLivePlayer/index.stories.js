/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import configureStore from 'redux-mock-store';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import CondensedPlayer from './index';

export default {
  component: CondensedPlayer,
  title: 'Condensed Player',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

export const Default = () => {
  const initialState = {
    audioPlayer: {
      sourceUrl: 'testSourceUrl',
      currentTime: number('Current Time', 800),
      duration: number('Duration', 2345),
      playing: boolean('Playing', false),
      loading: boolean('Loading', false),
    },
    episode: {
      show: { name: text('Show Name', 'Show Name') },
      title: text(
        'Episode Title',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur, consectetur cupiditate'
      ),
      imageUrl:
        'https://www.omnycontent.com/d/programs/820f09cf-2ace-4180-a92d-aa4c0008f5fb/e8ac5452-37a8-4262-9024-aa7d00649cd3/image.jpg?size=Medium&t=1566881113',
    },
  };
  const mockStore = configureStore([]);
  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <CondensedPlayer />
    </Provider>
  );
};
