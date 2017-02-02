import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Welcome } from './Welcome';

const setup = () => {
  const props = {
    dispatch: jest.fn()
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

  it('should simulate input field', () => {
    const value = 'Dan';
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', {target: {value}});
    expect(wrapper.find('input').props().value)
      .toEqual(value);
  });

  it('should not call submit action on submit with no text', () => {
    const value = '';
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.find('input').simulate('change', {target: {value}});
    wrapper.find('form').simulate('submit');
    expect(props.dispatch)
      .not.toHaveBeenCalled();
  });

  it('should call submit action on submit with text', () => {
    const value = 'Dan';
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.find('input').simulate('change', {target: {value}});
    wrapper.find('form').simulate('submit');
    expect(props.dispatch)
      .toHaveBeenCalled();
  });
});
