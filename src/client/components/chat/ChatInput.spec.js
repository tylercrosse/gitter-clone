import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import ChatInput from './ChatInput.jsx';

const setup = (propOverrides) => {
  const props = Object.assign({
    user: {
      username: 'Bob'
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
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });

  it('should simulate textarea field', () => {
    const value = 'My new value';
    const { wrapper } = setup();
    wrapper.find('textarea').simulate('change', {target: {value}});
    expect(wrapper.find('textarea').props().value)
      .toEqual(value);
  });

  it('should call submit action on submit', () => {
    const value = 'My new value';
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.find('textarea').simulate('change', {target: {value}});
    wrapper.find('form').simulate('submit');
    expect(props.onMessageSubmit)
      .toHaveBeenCalledTimes(1);
  });
});
