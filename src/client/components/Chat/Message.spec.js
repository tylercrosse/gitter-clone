import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Message from './Message.jsx';

const props = {
  message: {
    id: 0,
    text: 'Use Redux'
  }
};

describe('<Message />', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Message />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the text', () => {
    const wrapper = shallow(<Message {...props.message} />);
    expect(wrapper.text())
      .toEqual(props.message.text);
  });
});
