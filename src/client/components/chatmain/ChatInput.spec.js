import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import marked from 'marked';
import ChatInput from './ChatInput.jsx';

const setup = (propOverrides) => {
  const props = Object.assign({
    user: {
      username: 'Bob',
      loggedIn: true
    },
    routeParams: {
      convo: 'redux'
    },
    onMessageSubmit: jest.fn()
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

    it('should call submit action on submit with text', () => {
      const value = 'My new value';
      const { props, component } = setup();
      const wrapper = mount(component);
      wrapper.find('textarea').simulate('change', {target: {value}});
      wrapper.find('form').simulate('submit');
      expect(props.onMessageSubmit)
        .toHaveBeenCalledWith(expect.objectContaining({text: value}));
    });

    it('should initialize marked with options on mount', () => {
      marked.setOptions = jest.fn();
      const { component } = setup();
      shallow(component);
      expect(marked.setOptions)
        .toHaveBeenCalledWith(expect.objectContaining({sanitize: true}));
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
