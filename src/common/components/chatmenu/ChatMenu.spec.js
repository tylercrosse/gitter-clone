import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ChatMenu, mapStateToProps } from './ChatMenu';

const setup = () => {
  const props = {
    modalIsOpen: false,
    openCreateRoomModal: jest.fn(),
    closeModal: jest.fn(),
    addConvo: jest.fn(),
    fetchConvos: jest.fn(),
    user: {
      loggedIn: true
    },
    convos: [
      {
        id: '9ebb6983-50cf-4226-ab4b-1ebd12db80a3',
        name: 'chat',
        direct: false,
        createdAt: '2017-06-20T21:21:24.752Z',
        updatedAt: '2017-06-20T21:21:24.752Z'
      },
      {
        id: 'f55f180f-3974-41ab-a521-931d52101914',
        name: 'react',
        direct: false,
        createdAt: '2017-06-20T21:21:29.312Z',
        updatedAt: '2017-06-20T21:21:29.312Z'
      }
    ],
    panel: {
      open: false,
      title: 'chat2',
      inner: 'chat2',
    },
    openConvosPanel: jest.fn(),
    openDirectMessagesPanel: jest.fn(),
    closePanel: jest.fn(),
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

  xit('should toggle active state on menu button click', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find('.minibar-button-convos').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    wrapper.find('.minibar-button-convos').simulate('click');
    expect(wrapper.state().active).toBeFalsy();
  });

  xit('should toggle active state onMouseLeave', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find('.minibar-button-convos').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    // trouble simulating clientX on synthetic mouseLeave event
    wrapper.instance().handleMouseLeave({clientX: 400});
    expect(wrapper.state().active).toBeFalsy();
  });

  xit('should apply class "active" when state is active', () => {
    const { component } = setup();
    const wrapper = mount(component);
    expect(wrapper.state().active).toBeFalsy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeFalsy();
    wrapper.find('.minibar-button-convos').simulate('click');
    expect(wrapper.state().active).toBeTruthy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeTruthy();
  });

  it('should receive the correct props from state', () => {
    const { props } = setup();
    const ui = {
      modalIsOpen: { createRoom: false },
      panel: props.panel
    };
    expect(mapStateToProps({...props, ui}))
      .toEqual({
        modalIsOpen: props.modalIsOpen,
        user: props.user,
        panel: props.panel,
        convos: props.convos,
        directConvos: []
      });
  });
});
