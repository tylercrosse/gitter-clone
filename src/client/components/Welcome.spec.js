import React from 'react';
import renderer from 'react-test-renderer';
import { Welcome } from './Welcome';

describe('<Welcome />', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Welcome />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should allow users to sign-in', () => {});
});
