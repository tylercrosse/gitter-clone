import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import MessageList from './chat/MessageList.jsx';
import MessageForm from './chat/MessageForm.jsx';

describe('<App />', () => {
  it('should contain <MessageList />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<MessageList />))
      .toEqual(true);
  });

  it('should contain <MessageForm />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<MessageForm />))
      .toEqual(true);
  });
});
