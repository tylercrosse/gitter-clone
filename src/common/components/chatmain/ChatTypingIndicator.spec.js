import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatTypingIndicator from './ChatTypingIndicator';

const setup = () => {
  const props = {
    isTyping: 'Dan'
  };
  const component = <ChatTypingIndicator {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatTypingIndicator />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
