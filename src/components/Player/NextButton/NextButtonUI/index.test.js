import React from 'react';
import renderer from 'react-test-renderer';
import NextUI from './index';

describe('<NextUI /> component', () => {
  const props = {
    className: 'class name',
    withTheming: false,
    onClick: jest.fn(),
  };

  test('it should render a NextUI component', () => {
    const component = renderer.create(<NextUI {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it should render a NextUI component with theming color', () => {
    props.withTheming = true;

    const component = renderer.create(<NextUI {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
