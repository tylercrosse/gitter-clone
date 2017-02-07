import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ConvoItem from './ConvoItem.jsx';

const setup = () => {
  const props = {
    _id: '5898b15d6047fd8db8b4e3bb',
    updatedAt: '2017-02-06T17:24:45.657Z',
    createdAt: '2017-02-06T17:24:45.657Z',
    name: 'chat2',
    __v: 0
  };
  const component = <ConvoItem {...props} />;

  return {
    props,
    component
  };
};

describe('<ConvoItem />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
