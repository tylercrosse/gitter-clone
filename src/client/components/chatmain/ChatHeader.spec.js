import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatHeader from './ChatHeader.jsx';

const setup = (propOverrides) => {
  const props = Object.assign({
    user: {
      loggedIn: true,
      username: 'dan'
    }
  }, propOverrides);

  const component = <ChatHeader {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatHeader />', () => {
  describe('logged in', () => {
    it('should render correctly', () => {
      const { component } = setup();
      const renderedComponent = renderer.create(component);
      const tree = renderedComponent.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('logged out', () => {
    it('should render correctly', () => {
      const { component } = setup({user: {loggedIn: false}});
      const renderedComponent = renderer.create(component);
      const tree = renderedComponent.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
