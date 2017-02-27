import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Welcome } from './Welcome';

const setup = () => {
  const props = {
    user: {},
    modalIsOpen: {signIn: false},
    closeModal: jest.fn(),
    openSignInModal: jest.fn(),
    signIn: jest.fn()
  };

  const component = <Welcome {...props} />;
  const wrapper = mount(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<Welcome />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
