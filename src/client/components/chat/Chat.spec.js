import React        from 'react';
import renderer     from 'react-test-renderer';
import { shallow }  from 'enzyme';
import { Chat,
  mapStateToProps } from './Chat';

const setup = (propOverrides) => {
  const props = Object.assign({
    bursts: {},
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
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });

  it('should recieve the correct props from state', () => {
    const { props } = setup();
    console.log(expect(mapStateToProps(props))
          .toEqual({
            bursts: props.bursts,
            user: props.user
          }));
    expect(mapStateToProps(props))
      .toEqual({
        bursts: props.bursts,
        user: props.user
      });
  });
});
