import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import ChatInput from './ChatInput';

const setup = (propOverrides) => {
  const props = Object.assign({
    user: {
      username: 'Bob',
      loggedIn: true
    },
    routeParams: {
      convo: 'redux'
    },
    onMessageSubmit: jest.fn(),
    startTyping: jest.fn(),
    stopTyping: jest.fn()
  }, propOverrides);

  const component = <ChatInput {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<ChatInput />', () => {
  describe('logged in', () => {
    it('should render correctly', () => {
      const { component } = setup();
      const renderedComponent = renderer.create(component);
      const tree = renderedComponent.toJSON();
      expect(tree)
        .toMatchSnapshot();
    });

    it('should contain <form />', () => {
      const { wrapper } = setup();
      expect(wrapper.find('form'))
        .toHaveLength(1);
    });

    it('should simulate textarea field', () => {
      const value = 'My new value';
      const { wrapper } = setup();
      wrapper.find('textarea').simulate('change', {target: {value}});
      expect(wrapper.find('textarea').props().value)
        .toEqual(value);
    });

    it('should submit on enter, but not shift+enter', () => {
      const shiftEnterEvent = {
        key: 'Enter',
        nativeEvent: {shiftKey: true}
      };
      const enterEvent = {
        key: 'Enter',
        nativeEvent: {shiftKey: false}
      };
      const { component } = setup();
      const wrapper = mount(component);
      wrapper.instance().handleSubmit = jest.fn();
      wrapper.instance().handleKeyPress(shiftEnterEvent);
      expect(wrapper.instance().handleSubmit)
        .toHaveBeenCalledTimes(0);
      wrapper.instance().handleKeyPress(enterEvent);
      expect(wrapper.instance().handleSubmit)
        .toHaveBeenCalledTimes(1);
    });

    it('should call submit action on submit with text', () => {
      const value = 'My new value';
      const { props, component } = setup();
      const wrapper = mount(component);
      // no message (trim conditional)
      wrapper.find('form').simulate('submit');
      expect(props.onMessageSubmit)
        .toHaveBeenCalledTimes(0);
      // with message
      wrapper.find('textarea').simulate('change', {target: {value}});
      wrapper.find('form').simulate('submit');
      expect(props.onMessageSubmit)
        .toHaveBeenCalledWith(expect.objectContaining({text: value}));
    });
  });

  describe('logged out', () => {
    it('should render correctly', () => {
      const { component } = setup({user: {loggedIn: false}});
      const renderedComponent = renderer.create(component);
      const tree = renderedComponent.toJSON();
      expect(tree)
        .toMatchSnapshot();
    });

    it('should not contain <form />', () => {
      const { wrapper } = setup({user: {loggedIn: false}});
      expect(wrapper.find('form'))
        .toHaveLength(0);
    });
  });
});
