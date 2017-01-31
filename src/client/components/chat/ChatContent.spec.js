import React       from 'react';
import { shallow } from 'enzyme';
import renderer    from 'react-test-renderer';
import ChatItem    from './ChatItem.jsx';
import ChatContent from './ChatContent.jsx';

const setup = () => {
  const props = {
    messages: [
      {
        _id: 0,
        text: 'Use Redux',
        updatedAt: '2017-01-25T00:58:33.702Z',
        createdAt: '2017-01-25T00:58:33.702Z'
      }
    ]
  };
  const component = <ChatContent {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<ChatContent />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <ChatItem /> for each message', () => {
    const { props, wrapper } = setup();
    expect(wrapper.find(ChatItem))
      .toHaveLength(props.messages.length);
  });
});
