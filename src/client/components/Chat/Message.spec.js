import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Message from './Message.jsx';

const setup = () => {
  const props = {
    _id: 0,
    text: 'Use Redux',
    updatedAt: '2017-01-25T00:58:33.702Z',
    createdAt: '2017-01-25T00:58:33.702Z'
  };
  const component = <Message {...props} />;

  return {
    props,
    component
  };
};

describe('<Message />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
