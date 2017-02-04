import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CreateRoomModal from './CreateRoomModal.jsx';

const setup = () => {
  const props = {
  };
  const component = <CreateRoomModal {...props} />;

  return {
    props,
    component
  };
};

describe('<CreateRoomModal />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // close modal by clicking cancel
  // close modal by clicking outside of modal
});
