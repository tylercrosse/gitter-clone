import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ConvoItem from './ConvoItem';

const setup = () => {
  const props = {
    id: '5898b15d6047fd8db8b4e3bb',
    updatedAt: '2017-02-06T17:24:45.657Z',
    createdAt: '2017-02-06T17:24:45.657Z',
    name: 'chat2',
    title: 'chat2',
    __v: 0
  };
  const component = <ConvoItem {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<ConvoItem />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
