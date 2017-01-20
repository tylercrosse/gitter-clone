import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from './App';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

describe('<App />', () => {
  it('should render correctly', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

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
