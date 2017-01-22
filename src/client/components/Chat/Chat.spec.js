import React from 'react';
import { shallow } from 'enzyme';
import { Chat } from './Chat';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [
      // {id: '0', text: 'a message'}
    ],
    user: {
      loggedIn: true
    }
  }, propOverrides);

  const wrapper = shallow(<Chat {...props} />);

  return {
    props,
    wrapper
  };
};

describe('<Chat />', () => {
  it('should contain <MessageList />', () => {
    const { wrapper } = setup();
    expect(wrapper.find(MessageList))
      .toHaveLength(1);
  });

  describe('logged in', () => {
    it('should contain <MessageForm />', () => {
      const { wrapper } = setup();
      expect(wrapper.find(MessageForm))
        .toHaveLength(1);
    });
  });

  describe('logged out', () => {
    it('should not contain <MessageForm />', () => {
      const { wrapper } = setup({user: {loggedIn: false}});
      expect(wrapper.find(MessageForm))
        .toHaveLength(0);
    });
  });
});
