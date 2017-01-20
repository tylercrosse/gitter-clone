import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Message from './Message.jsx';
import { MessageList, mapStateToProps } from './MessageList.jsx';

const setup = () => {
  const props = {
    messages: [
      {
        id: 0,
        text: 'Use Redux'
      }
    ]
  };

  const component = <MessageList {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<MessageList />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <Message /> for each message', () => {
    const { props, wrapper } = setup();
    expect(wrapper.find(Message))
      .toHaveLength(props.messages.length);
  });

  it('should properly structure props from state', () => {
    const { props } = setup();
    expect(mapStateToProps(props)).toEqual({
      messages: props.messages
    });
  });
});
