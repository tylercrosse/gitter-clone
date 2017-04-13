import React        from 'react';
import { shallow, mount }  from 'enzyme';
import toJson from 'enzyme-to-json';
import { ChatMain,
  makeMapStateToProps } from './ChatMain';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [],
    user: {
      loggedIn: true
    },
    routeParams: {
      convo: 'chat'
    },
    convoName: 'chat',
    isFetching: false,
    modalIsOpen: {signIn: false},
    fetchMessages: jest.fn(),
    addMessage: jest.fn(),
    signIN: jest.fn(),
    error: {
      messages: false
    }
  }, propOverrides);

  const component = <ChatMain {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatMain />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const wrapper = shallow(component);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when fetching', () => {
    const { props } = setup({isFetching: true});
    const wrapper = shallow(<ChatMain {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render correctly when 404 error', () => {
    const errorOverride = {
      error: {
        status: 404
      }
    };
    const { props } = setup(errorOverride);
    const wrapper = shallow(<ChatMain {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call fetchData() at lifecycle changes', () => {
    const { props, component } = setup();
    const newProps = setup({convoName: 'react'}).props;
    const wrapper = mount(component);
    // fetchMessages called once on mount
    expect(props.fetchMessages).toHaveBeenCalledTimes(1);
    // fetchMessages not called, no change in props
    wrapper.instance().componentDidUpdate(props);
    expect(props.fetchMessages).toHaveBeenCalledTimes(1);
    // fetchMessages called again on update
    wrapper.instance().componentDidUpdate(newProps);
    expect(props.fetchMessages).toHaveBeenCalledTimes(2);
  });

  it('should receive the correct props from state', () => {
    const { props } = setup();
    let state = {
      convos: {},
      ui: {isFetching: false},
      error: {messages: false}
    };
    const mapStateToProps = makeMapStateToProps();
    expect(mapStateToProps(state, props))
      .toMatchSnapshot();
    state = {
      convos: {chat: []},
      ui: {isFetching: false},
      error: {messages: false}
    };
    expect(mapStateToProps(state, props))
      .toMatchSnapshot();
  });
});
