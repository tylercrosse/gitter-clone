import React        from 'react';
import renderer     from 'react-test-renderer';
import { shallow }  from 'enzyme';
import { Chat,
  mapStateToProps } from './Chat';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: {},
    user: {
      loggedIn: true
    },
    fetchMessages: jest.fn(),
    addMessage: jest.fn()
  }, propOverrides);

  const component = <Chat {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<Chat />', () => {
  xit('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });

  xit('should call fetchMessages() at componentDidMount', () => {
    const { props, component } = setup();
    renderer.create(component);
    expect(props.fetchMessages).toHaveBeenCalledTimes(1);
  });

  it('should recieve the correct props from state', () => {
    const { props } = setup();
    expect(mapStateToProps(props))
      .toEqual({
        messages: props.messages,
        user: props.user
      });
  });
});
