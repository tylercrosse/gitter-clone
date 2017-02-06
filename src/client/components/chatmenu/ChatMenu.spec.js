import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ChatMenu, mapStateToProps } from './ChatMenu.jsx';

const setup = () => {
  const props = {
    modalIsOpen: false,
    openModal: jest.fn(),
    closeModal: jest.fn(),
    user: {
      loggedIn: true
    }
  };

  const component = <ChatMenu {...props} />;

  return {
    props,
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
    wrapper.find('.minibar-button').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    wrapper.find('.minibar-button').simulate('click');
    expect(wrapper.state().active).toBeFalsy();
  });

  it('should toggle active state onMouseLeave', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find('.minibar-button').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    // trouble simulating clientX on synthetic mouseLeave event
    wrapper.instance().handleMouseLeave({clientX: 400});
    expect(wrapper.state().active).toBeFalsy();
  });

  it('should apply class "active" when state is active', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeFalsy();
    wrapper.find('.minibar-button').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeTruthy();
  });

  it('should recieve the correct props from state', () => {
    const { props } = setup();
    expect(mapStateToProps({ui: {...props}}))
      .toEqual({
        modalIsOpen: props.modalIsOpen,
        user: props.user
      });
  });
});
