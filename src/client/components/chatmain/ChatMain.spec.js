import React        from 'react';
import { shallow }  from 'enzyme';
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
    fetchMessages: jest.fn(),
    addMessage: jest.fn()
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

  xit('should call fetchMessages() at componentDidMount', () => {
    // FIXME TODO need store to render nested connected component
  });

  it('should recieve the correct props from state', () => {
    const { props } = setup();
    let state = {
      convos: {},
      ui: {isFetching: false}
    };
    const mapStateToProps = makeMapStateToProps();
    expect(mapStateToProps(state, props))
      .toMatchSnapshot();
    state = {
      convos: {chat: []},
      ui: {isFetching: false}
    };
    expect(mapStateToProps(state, props))
      .toMatchSnapshot();
  });
});
