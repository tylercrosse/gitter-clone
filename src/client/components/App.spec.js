import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App.jsx';

const setup = () => {
  const props = {
    user: {
      loggedIn: false
    }
  };

  return {
    props
  };
};

describe('<App />', () => {
  it('should render children when passed in', () => {
    const { props } = setup();
    const wrapper = shallow(
      <App {...props} >
        <div className="unique" />
      </App>
    );
    expect(wrapper.contains(<div className="unique" />)).toEqual(true);
  });
});
