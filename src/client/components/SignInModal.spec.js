import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SignInModal from './SignInModal.jsx';

const setup = () => {
  const props = {
    onFormSubmit: jest.fn(),
    onRequestClose: jest.fn()
  };
  const component = <SignInModal {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper,
    component
  };
};

describe('<SignInModal />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // close modal by clicking cancel
  // close modal by clicking outside of modal

  it('should contain <input />', () => {
    const { wrapper } = setup();
    expect(wrapper.find('input'))
      .toHaveLength(1);
  });

  it('should simulate input field', () => {
    const value = 'My new value';
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', {target: {value}});
    expect(wrapper.find('input').props().value)
      .toEqual(value);
  });

  it('should call submit action on submit with text', () => {
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    expect(props.onFormSubmit).toHaveBeenCalled();
  });
});
