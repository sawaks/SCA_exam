import React from 'react';
import renderer from 'react-test-renderer';
import FastForwardUI from './index';

describe('<FastForwardUI /> component', () => {
  const props = {
    className: 'class name',
    onClick: jest.fn(),
  };

  test('it should render a FastForwardUI component', () => {
    const component = renderer.create(<FastForwardUI {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
