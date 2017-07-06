import React              from 'react';
import { shallow, mount } from 'enzyme';
import renderer           from 'react-test-renderer';
import SignInModal,
 { validateInput }        from './SignInModal';

const setup = () => {
  const props = {
    onFormSubmit: jest.fn(),
    onRequestClose: jest.fn(),
    modalIsOpen: true
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
    const validInput = 'Dan';
    const invalidInput = '*_Dan_*';
    const { wrapper } = setup();
    wrapper.state().validInput = false;
    expect(wrapper.state().validInput).toBe(false);

    wrapper.find('input').simulate('change', {target: {value: invalidInput}});
    expect(wrapper.find('input').props().value)
    .toEqual(invalidInput);
    expect(wrapper.state().validInput).toBe(false);

    wrapper.find('input').simulate('change', {target: {value: validInput}});
    expect(wrapper.find('input').props().value)
      .toEqual(validInput);
    expect(wrapper.state().validInput).toBe(true);
  });

  it('should call submit action on submit with valid input', () => {
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.setState({name: 'Dan'});
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    expect(props.onFormSubmit).toHaveBeenCalled();
  });

  it('should not call submit action on submit with invalid input', () => {
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.setState({name: 'D   an'});
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    expect(props.onFormSubmit).not.toHaveBeenCalled();
  });

  it('should validate input', () => {
    // alphanumeric + underscore, single internal space, & hyphen Ok
    expect(validateInput('Dan_1-23')).toEqual(true);
    expect(validateInput('Da n1-23')).toEqual(true);
    // multiple spaces
    expect(validateInput('Da  n1-23')).toEqual(false);
    // leading space
    expect(validateInput(' Dan1-23')).toEqual(false);
    // trailing space
    expect(validateInput('Dan1-23 ')).toEqual(false);
    // forbidden characters
    expect(validateInput('Dan`1-23')).toEqual(false);
    expect(validateInput('Dan1-~23')).toEqual(false);
    expect(validateInput('Dan1-23!')).toEqual(false);
    expect(validateInput('Dan@1-23')).toEqual(false);
    expect(validateInput('Dan$1-23')).toEqual(false);
    expect(validateInput('Dan%1-23')).toEqual(false);
    expect(validateInput('Dan^1-23')).toEqual(false);
    expect(validateInput('Da&n1-23')).toEqual(false);
    expect(validateInput('Dan*1-23')).toEqual(false);
    expect(validateInput('Dan(1-23')).toEqual(false);
    expect(validateInput('Dan)1-23')).toEqual(false);
    expect(validateInput('Dan[1-23')).toEqual(false);
    expect(validateInput('Dan]1-23')).toEqual(false);
    expect(validateInput('Dan{1-23')).toEqual(false);
    expect(validateInput('Dan}1-23')).toEqual(false);
    expect(validateInput('Da?n1-23')).toEqual(false);
    expect(validateInput('Da/n1-23')).toEqual(false);
    expect(validateInput('Dan1-2<3')).toEqual(false);
    expect(validateInput('Dan1-2>3')).toEqual(false);
    expect(validateInput('Dan|1-23')).toEqual(false);
    expect(validateInput('Dan1\\23')).toEqual(false);
    expect(validateInput('Dan1\n23')).toEqual(false);
    expect(validateInput('Dan1:23')).toEqual(false);
    expect(validateInput('Dan1;23')).toEqual(false);
    expect(validateInput('Dan1"23')).toEqual(false);
    expect(validateInput("Dan1'23")).toEqual(false);
  });
});
