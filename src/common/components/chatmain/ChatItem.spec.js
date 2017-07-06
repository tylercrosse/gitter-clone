import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatItem from './ChatItem';

const setup = (propOverrides) => {
  const props = Object.assign({
    id: 0,
    burstStart: true,
    text: 'Use Redux',
    rawMarkup: '<p>Use Redux</p>',
    User: {
      name: 'Dan'
    },
    updatedAt: '2017-01-25T00:58:33.702Z',
    createdAt: '2017-01-25T00:58:33.702Z'
  }, propOverrides);

  const component = <ChatItem {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<ChatItem />', () => {
  describe('burstStart == true', () => {
    it('should render correctly without markup', () => {
      const { wrapper } = setup();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with markup', () => {
      const { wrapper } = setup({rawMarkup: '<p>woohoo!</p>'});
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('burstStart == false', () => {
    it('should render correctly without markup', () => {
      const { wrapper } = setup({burstStart: false});
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with markup', () => {
      const { wrapper } = setup({
        burstStart: false,
        rawMarkup: '<p>woohoo!</p>'
      });
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
