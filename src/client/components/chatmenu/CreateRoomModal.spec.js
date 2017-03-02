import React              from 'react';
import { shallow, mount } from 'enzyme';
import renderer           from 'react-test-renderer';
import CreateRoomModal,
 { validateInput }        from './CreateRoomModal.jsx';

const setup = () => {
  const props = {
    user: {
      username: 'Dan',
      loggedIn: true
    },
    onFormSubmit: jest.fn(),
    onRequestClose: jest.fn()
  };
  const component = <CreateRoomModal {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper,
    component
  };
};

describe('<CreateRoomModal />', () => {
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

  it('should call submit action on submit with valid input', () => {
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.setState({name: 'React'});
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    expect(props.onFormSubmit).toHaveBeenCalled();
  });

  it('should not call submit action on submit with invalid input', () => {
    const { props, component } = setup();
    const wrapper = mount(component);
    wrapper.setState({name: 'Re  act'});
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    expect(props.onFormSubmit).not.toHaveBeenCalled();
  });

  it('should validate input', () => {
    // alphanumeric + underscore & hyphen Ok
    expect(validateInput({username: 'dan', name: 'Dan_1-23'})).toEqual(true);
    // leading hyphen
    expect(validateInput({username: 'dan', name: '-Dan1-23'})).toEqual(false);
    // trailing hyphen
    expect(validateInput({username: 'dan', name: 'Dan1-23-'})).toEqual(false);
    // forbidden characters
    expect(validateInput({username: 'dan', name: 'Da n1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan`1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1-~23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1-23!'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan@1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan$1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan%1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan^1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Da&n1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan*1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan(1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan)1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan[1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan]1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan{1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan}1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Da?n1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Da/n1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1-2<3'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1-2>3'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan|1-23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1\\23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1\n23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1:23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1;23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: 'Dan1"23'})).toEqual(false);
    expect(validateInput({username: 'dan', name: "Dan1'23"})).toEqual(false);
  });
});
