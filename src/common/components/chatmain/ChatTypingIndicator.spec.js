import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatTypingIndicator from './ChatTypingIndicator';

const setup = (propOverrides) => {
  const props = Object.assign({
    usersTyping: ['Dan']
  }, propOverrides);

  const component = <ChatTypingIndicator {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatTypingIndicator />', () => {
  it('should render correctly with 1 user typing', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with 2 users typing', () => {
    const usersTyping = ['Dan', 'Liz'];
    const { component } = setup({ usersTyping });
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with 3 users typing', () => {
    const usersTyping = ['Dan', 'Liz', 'Joe'];
    const { component } = setup({ usersTyping });
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with >3 users typing', () => {
    const usersTyping = ['Dan', 'Liz', 'Joe', 'Sue'];
    const { component } = setup({ usersTyping });
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
