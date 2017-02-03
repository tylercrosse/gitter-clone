import React from 'react';
import { mount } from 'enzyme';
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

  it('should toggle active state on menu button click', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find('.chat-menu button').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    wrapper.find('.chat-menu button').simulate('click');
    expect(wrapper.state().active).toBeFalsy();
  });

  it('should toggle active state onMouseLeave', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find('.chat-menu button').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    wrapper.find('.chat-menu').simulate('mouseleave');
    expect(wrapper.state().active).toBeFalsy();
  });

  it('should apply class "active" when state is active', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeFalsy();
    wrapper.find('.chat-menu button').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeTruthy();
  });
});
