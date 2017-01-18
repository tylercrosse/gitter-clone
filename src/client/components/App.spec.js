import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Conversation from './Conversation.jsx';
import MessageForm from './MessageForm.jsx';

describe('<App />', () => {
  it('should contain <Conversation />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Conversation />))
      .toEqual(true);
  });

  it('should contain <MessageForm />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<MessageForm />))
      .toEqual(true);
  });
});
