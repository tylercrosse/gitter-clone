import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

describe('<Chat />', () => {
  it('should contain <MessageList />', () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper.contains(<MessageList />))
      .toEqual(true);
  });

  it('should contain <MessageForm />', () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper.contains(<MessageForm />))
      .toEqual(true);
  });
});
