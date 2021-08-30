import React from 'react';
import renderer from 'react-test-renderer';
import PlayButtonUI from './index';

describe('<PlayButtonUI /> component', () => {
  const props = {
    onClick: jest.fn(),
    isPlaying: false,
    isLoading: false,
    variant: 'xs',
  };

  test('it should render a PauseIcon component', () => {
    const component = renderer.create(<PlayButtonUI {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it should render a StopIcon component', () => {
    props.catchupMiniPlayer = false;

    const component = renderer.create(<PlayButtonUI {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
