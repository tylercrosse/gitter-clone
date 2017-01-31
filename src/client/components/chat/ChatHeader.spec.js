import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatToolbar from './ChatToolbar.jsx';

const setup = () => {
  const component = <ChatToolbar />;

  return {
    component
  };
};

describe('<ChatToolbar />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
