import React from 'react';
import renderer from 'react-test-renderer';
import PlaybackRateButtonUI from './index';

describe('<PlaybackRateButtonUI /> component', () => {
  const props = {
    isPlaying: true,
    isLoading: false,
    onClick: jest.fn(),
  };

  test('it should render PlaybackRateButtonUI component', () => {
    const component = renderer.create(<PlaybackRateButtonUI {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
