import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatToolbar from './ChatToolbar';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [
      {User: {name: 'Joe', id: 123}},
      {User: {name: 'Josh', id: 654}},
    ],
    user: {name: 'Liz', id: 323}
  }, propOverrides);

  const wrapper = shallow(<ChatToolbar {...props} />);

  return {
    props,
    wrapper
  };
};

describe('<ChatToolbar />', () => {
  it('should render correctly when logged in', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when not logged in', () => {
    const { wrapper } = setup({user: {}});
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
