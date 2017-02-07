import React        from 'react';
import { shallow }  from 'enzyme';
import toJson from 'enzyme-to-json';
import { Chat,
  mapStateToProps } from './Chat';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: {},
    user: {
      loggedIn: true
    },
    fetchMessages: jest.fn(),
    addMessage: jest.fn()
  }, propOverrides);

  const component = <Chat {...props} />;

  return {
    props,
    component
  };
};

describe('<Chat />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const wrapper = shallow(component);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  xit('should call fetchMessages() at componentDidMount', () => {
    // FIXME TODO need store to render nested connected component
  });

  it('should recieve the correct props from state', () => {
    const { props } = setup();
    expect(mapStateToProps(props))
      .toEqual({
        messages: props.messages,
        user: props.user
      });
  });
});
