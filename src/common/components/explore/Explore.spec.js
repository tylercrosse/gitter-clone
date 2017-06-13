import React       from 'react';
import renderer    from 'react-test-renderer';
import { Explore } from './Explore';

const setup = (propOverrides) => {
  const props = Object.assign({
    convos: {
      '5898b14f6047fd8db8b4e3ba': {
        id: '5898b14f6047fd8db8b4e3ba',
        updatedAt: '2017-02-06T17:24:31.593Z',
        createdAt: '2017-02-06T17:24:31.593Z',
        name: 'chat',
        messages: ['1'],
        __v: 0
      },
      '5898b15d6047fd8db8b4e3bb': {
        id: '5898b15d6047fd8db8b4e3bb',
        updatedAt: '2017-02-06T17:24:45.657Z',
        createdAt: '2017-02-06T17:24:45.657Z',
        name: 'chat2',
        messages: ['1', '2', '3'],
        __v: 0
      }
    }
  }, propOverrides);

  return {
    props
  };
};

describe('<ConvoItem />', () => {
  it('should render correctly', () => {
    const { props } = setup();
    const component = <Explore {...props} />;
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
