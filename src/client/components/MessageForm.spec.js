import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import { MessageForm } from './MessageForm.jsx';

// const setup = (propOverrides) => {
//   const props = Object.assign({
//     dispatch: jest.fn()
//   }, propOverrides);
//
//   const wrapper = shallow(<MessageForm {...props} />);
//
//   return {
//     props,
//     wrapper
//   };
// };

describe('<MessageForm />', () => {
  it('should render correctly', () => {
    const component = renderer.create(<MessageForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simulate click events', () => {
    // const { props, wrapper } = setup();
    // const value = 'My new value';
    // wrapper.find('input').simulate('change', {target: {value}});
    // wrapper.find('form').simulate('submit');
    // expect(props.dispatch).toHaveBeenCalledTimes(1);
  });

  it('simulate input field', () => {
    // const value = 'My new value';
    // const { wrapper } = setup();
    // wrapper.find('input').simulate('change', {target: {value}});
    // expect(wrapper.find('input').text())
    //   .toEqual(value);
  });
});
