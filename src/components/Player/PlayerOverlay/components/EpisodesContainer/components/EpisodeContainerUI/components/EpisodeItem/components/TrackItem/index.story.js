/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayIcon from 'components/Icons/play.svg';
import TrackItem from './index';

const smallImgProps = {
  imageUrl: 'https://nowplaying.scadigital.com.au/images/soniadada-soniadada-youdonttreatmenogood.png?station=2day_fm',
  description: ' Jane smuggles kids into a hotel plus Andrew Denton, Mick sings Kiss songs and Rai from Thirsty Merc sings his own songs plus Andrew Denton!',
  subDescription: 'TAG - DD month YYYY - Info',
};

const largeImgProps = {
  imageUrl: 'https://cdn-img.scalabs.com.au/UBGLBNb9nqOSuRx-ijY4AM-JGLE36gdJz5uKgy3LRKs/aHR0cHM6Ly9zdy1o/aXQtcHJkLnNjYWRp/Z2l0YWwuaW8vbWVk/aWEvNjY2MzcvdHJh/aW4tZ2xlbmJyb29r/LXR3aXR0ZXIuanBn/P3ByZXNldD1tcnBy/ZXZhcnRpY2xl',
  description: ' Jane smuggles kids into a hotel plus Andrew Denton, Mick sings Kiss songs and Rai from Thirsty Merc sings his own songs plus Andrew Denton!',
  subDescription: 'TAG - DD month YYYY - Info',
  wideImg: true,
};

storiesOf('Topic Item', module)
  .addWithJSX('Topic item with catchup image', () => (
    <TrackItem {...smallImgProps} />
  ))
  .addWithJSX('Topic item with video or news image', () => (
    <TrackItem {...largeImgProps} />
  ))
  .addWithJSX('Topic item with icon in subdescription', () => (
    <TrackItem {...largeImgProps} icon={PlayIcon} />
  ));
