import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('should contain hello world', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<h1>Hello world!</h1>)).toEqual(true);
  });
});
