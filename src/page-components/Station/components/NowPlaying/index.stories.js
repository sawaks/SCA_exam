/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
import React from 'react';
import { Flex } from 'reflexbox';
import { withKnobs, boolean, color } from '@storybook/addon-knobs';
import NowPlaying from './index';

export default {
  title: 'NowPlaying',
  decorators: [withKnobs],
  component: NowPlaying,
};

const mockData = {
  currentTrack: {
    title: 'Song Title',
    imageUrl: 'https://i.insider.com/5f2dbbf158c24d07956f289a',
    artistName: 'Artist Name',
  },
  stationName: 'Station Name',
};

export const Default = () => (
  <Flex width={1} maxWidth={800}>
    <NowPlaying
      isPlaying={boolean('Playing', true)}
      bgColour={color('Background colour', '#0a2240')}
      currentTrack={mockData.currentTrack}
      stationName={mockData.stationName}
      openPlayer={() => alert('Playing!')}
    />
  </Flex>
);
