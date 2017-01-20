import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App.jsx';

describe('<App />', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow(
      <App>
        <div className="unique" />
      </App>
    );
    expect(wrapper.contains(<div className="unique" />)).toEqual(true);
  });
});
