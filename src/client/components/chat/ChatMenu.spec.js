import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatMenu from './ChatMenu.jsx';

const setup = () => {
  const component = <ChatMenu />;

  return {
    component
  };
};

describe('<ChatMenu />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
