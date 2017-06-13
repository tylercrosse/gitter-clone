import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatItem from './ChatItem';

const setup = (propOverrides) => {
  const props = Object.assign({
    id: 0,
    burstStart: true,
    text: 'Use Redux',
    username: 'Dan',
    updatedAt: '2017-01-25T00:58:33.702Z',
    createdAt: '2017-01-25T00:58:33.702Z'
  }, propOverrides);
  const component = <ChatItem {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatItem />', () => {
  describe('burstStart == true', () => {
    it('should render correctly without markup', () => {
      const { props } = setup();
      const renderedComponent = renderer.create(<ChatItem {...props} />);
      const tree = renderedComponent.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with markup', () => {
      const { props } = setup({rawMarkup: '<p>woohoo!</p>'});
      const renderedComponent = renderer.create(<ChatItem {...props} />);
      const tree = renderedComponent.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('burstStart == false', () => {
    it('should render correctly without markup', () => {
      const { props } = setup({burstStart: false});
      const renderedComponent = renderer.create(<ChatItem {...props} />);
      const tree = renderedComponent.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with markup', () => {
      const { props } = setup({
        burstStart: false,
        rawMarkup: '<p>woohoo!</p>'
      });
      const renderedComponent = renderer.create(<ChatItem {...props} />);
      const tree = renderedComponent.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
