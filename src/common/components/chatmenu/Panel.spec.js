import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Panel from './Panel';
import ConvoItem from './ConvoItem';

const setup = () => {
  const props = {
    modalIsOpen: false,
    onMouseLeave: jest.fn(),
    openCreateRoomModal: jest.fn(),
    closeModal: jest.fn(),
    addConvo: jest.fn(),
    fetchConvos: jest.fn(),
    user: {
      loggedIn: true
    },
    convos: {
      '5898b14f6047fd8db8b4e3ba': {
        id: '5898b14f6047fd8db8b4e3ba',
        updatedAt: '2017-02-06T17:24:31.593Z',
        createdAt: '2017-02-06T17:24:31.593Z',
        name: 'chat',
        __v: 0
      },
      '5898b15d6047fd8db8b4e3bb': {
        id: '5898b15d6047fd8db8b4e3bb',
        updatedAt: '2017-02-06T17:24:45.657Z',
        createdAt: '2017-02-06T17:24:45.657Z',
        name: 'chat2',
        __v: 0
      }
    }
  };

  const component = <Panel {...props} />;

  return {
    props,
    component
  };
};

describe('<Panel />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <ConvoItem /> for every convo', () => {
    const { props, component } = setup();
    const wrapper = shallow(component);
    expect(wrapper.find(ConvoItem).length)
      .toEqual(Object.keys(props.convos).length);
  });

  it('should toggle active state onMouseLeave', () => {
    const { component, props } = setup();
    const wrapper = mount(component);
    expect(props.onMouseLeave).not.toHaveBeenCalled();
    wrapper.find('.chat-menu-panel').simulate('mouseLeave');
    expect(props.onMouseLeave).toHaveBeenCalled();
  });

  it('should apply class "active" when props.active == true', () => {
    const { component, props } = setup();
    const wrapper = mount(component);
    expect(wrapper.props().active).toBeFalsy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeFalsy();
    wrapper.setProps({...props, active: true});
    expect(wrapper.props().active).toBeTruthy();
    expect(wrapper.find('.chat-menu-panel').hasClass('active'))
      .toBeTruthy();
  });
});
