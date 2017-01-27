import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Welcome } from './Welcome';

const setup = () => {
  const props = {
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

  it('should allow users to sign-in', () => {
    // const value = 'My new value';
    // const { props, wrapper } = setup();
    // wrapper.find('input').simulate('change', {target: {value}});
    // expect(wrapper).toHaveRef(value);
    // wrapper.find('form').simulate('submit');
    // expect(props.signIn)
    //   .toHaveBeenCalledTimes(1);
  });
});
