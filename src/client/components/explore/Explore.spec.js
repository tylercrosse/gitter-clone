import React from 'react';
import renderer from 'react-test-renderer';
import Explore from './Explore.jsx';

describe('<ConvoItem />', () => {
  it('should render correctly', () => {
    const component = <Explore />;
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
