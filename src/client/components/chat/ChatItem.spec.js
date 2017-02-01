import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatItem from './ChatItem.jsx';

const setup = () => {
  const props = {
    _id: 0,
    burstStart: true,
    text: 'Use Redux',
    username: 'Dan',
    updatedAt: '2017-01-25T00:58:33.702Z',
    createdAt: '2017-01-25T00:58:33.702Z'
  };
  const component = <ChatItem {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatItem />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
