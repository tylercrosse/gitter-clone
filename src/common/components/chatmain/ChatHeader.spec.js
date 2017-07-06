import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatHeader from './ChatHeader';

const setup = (propOverrides) => {
  const props = Object.assign({
    user: {
      loggedIn: true,
      name: 'dan'
    },
    pathname: '',
    signOut: jest.fn(),
  }, propOverrides);

  const component = <ChatHeader {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  };
};

describe('<ChatHeader />', () => {
  describe('logged in', () => {
    it('should render correctly', () => {
      const { wrapper } = setup();
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('logged out', () => {
    it('should render correctly', () => {
      const { wrapper } = setup({user: {loggedIn: false}});
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
