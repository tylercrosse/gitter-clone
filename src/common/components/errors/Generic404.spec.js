import React from 'react';
import renderer from 'react-test-renderer';
import Generic404 from './Generic404';

const setup = () => {
  const component = <Generic404 />;

  return {
    component
  };
};

describe('<Generic404 />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
