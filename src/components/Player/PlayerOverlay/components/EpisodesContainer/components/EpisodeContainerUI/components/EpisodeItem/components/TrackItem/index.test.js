/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TrackItem from './index';

describe('<TrackItem /> Component', () => {
  const smallImgProps = {
    item: {
      season: 1,
      episode: 1,
      imageUrl: 'https://nowplaying.scadigital.com.au/images/soniadada-soniadada-youdonttreatmenogood.png?station=2day_fm',
      description: ' Jane smuggles kids into a hotel plus Andrew Denton, Mick sings Kiss songs and Rai from Thirsty Merc sings his own songs plus Andrew Denton!',
      subDescription: 'TAG - DD month YYYY - Info',
    },
    isEpisodeNew: false,
  };

  const largeImgProps = {
    item: {
      season: 2,
      episode: 1,
      imageUrl: 'https://cdn-img.scalabs.com.au/UBGLBNb9nqOSuRx-ijY4AM-JGLE36gdJz5uKgy3LRKs/aHR0cHM6Ly9zdy1o/aXQtcHJkLnNjYWRp/Z2l0YWwuaW8vbWVk/aWEvNjY2MzcvdHJh/aW4tZ2xlbmJyb29r/LXR3aXR0ZXIuanBn/P3ByZXNldD1tcnBy/ZXZhcnRpY2xl',
      description: ' Jane smuggles kids into a hotel plus Andrew Denton, Mick sings Kiss songs and Rai from Thirsty Merc sings his own songs plus Andrew Denton!',
      subDescription: 'TAG - DD month YYYY - Info',
    },
    isEpisodeNew: true,
  };

  test('it should render the Topics for catchup items', () => {
    const component = renderer.create(<TrackItem {...smallImgProps} title={'Lastest catchup'} />);
    const tree = component.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });

  test('it should render the Topics for video or news items', () => {
    const component = renderer.create(<TrackItem {...largeImgProps} title={'Lastest news'} />);
    const tree = component.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });

  test('it should render the Topics with icon for video or news items', () => {
    const component = renderer.create(<TrackItem {...largeImgProps} title="Latest News" icon={<svg />} />);
    const tree = component.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });
});
