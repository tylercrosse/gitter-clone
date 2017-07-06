import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Avatar } from './Avatar';

const setup = () => {
  const props = {
    user: {},
    loggedInUser: {},
    findOrCreateDirectMessage: jest.fn()
  };
  const component = <Avatar {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<Avatar />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
