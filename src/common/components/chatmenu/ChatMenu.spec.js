import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ChatMenu, mapStateToProps } from './ChatMenu';

const setup = () => {
  const props = {
    modalIsOpen: {createRoom: false},
    openCreateRoomModal: jest.fn(),
    closeModal: jest.fn(),
    addConvo: jest.fn(),
    fetchConvos: jest.fn(),
    user: {
      loggedIn: true
    },
    convos: {
      '5898b15d6047fd8db8b4e3bb': {
        _id: '5898b15d6047fd8db8b4e3bb',
        updatedAt: '2017-02-06T17:24:45.657Z',
        createdAt: '2017-02-06T17:24:45.657Z',
        name: 'chat2',
        __v: 0
      }
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
    wrapper.find('.minibar-button-search').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    wrapper.find('.minibar-button-search').simulate('click');
    expect(wrapper.state().active).toBeFalsy();
  });

  it('should toggle active state onMouseLeave', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find('.minibar-button-search').simulate('click');
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
    wrapper.find('.minibar-button-search').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeTruthy();
  });

  it('should receive the correct props from state', () => {
    const { props } = setup();
    expect(mapStateToProps({...props, ui: {...props}}))
      .toEqual({
        modalIsOpen: props.modalIsOpen.createRoom,
        user: props.user,
        convos: props.convos
      });
  });
});
