import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatToolbar from './ChatToolbar.jsx';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [
      {username: 'Joe'},
      {username: 'Josh'},
    ],
    user: {username: 'Liz'}
  }, propOverrides);

  return {
    props
  };
};

describe('<ChatToolbar />', () => {
  it('should render correctly when logged in', () => {
    const { props } = setup();
    const renderedComponent = renderer.create(<ChatToolbar {...props} />);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when not logged in', () => {
    const { props } = setup({user: {}});
    const renderedComponent = renderer.create(<ChatToolbar {...props} />);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
