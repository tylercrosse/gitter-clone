import React from 'react';
import { shallow } from 'enzyme';
import { Chat, mapStateToProps } from './Chat';
import ChatContent from './ChatContent.jsx';
import ChatInput from './ChatInput.jsx';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [
      // {id: '0', text: 'a message'}
    ],
    user: {
      loggedIn: true
    },
    actions: {
      addMessage: jest.fn()
    }
  }, propOverrides);

  const wrapper = shallow(<Chat {...props} />);

  return {
    props,
    wrapper
  };
};

describe('<Chat />', () => {
  it('should contain <ChatContent />', () => {
    const { wrapper } = setup();
    expect(wrapper.find(ChatContent))
      .toHaveLength(1);
  });

  describe('logged in', () => {
    it('should contain <ChatInput />', () => {
      const { wrapper } = setup();
      expect(wrapper.find(ChatInput))
        .toHaveLength(1);
    });
  });

  describe('logged out', () => {
    it('should not contain <ChatInput />', () => {
      const { wrapper } = setup({user: {loggedIn: false}});
      expect(wrapper.find(ChatInput))
        .toHaveLength(0);
    });
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
