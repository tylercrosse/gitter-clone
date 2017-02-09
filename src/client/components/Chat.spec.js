import React        from 'react';
import { shallow }  from 'enzyme';
import toJson       from 'enzyme-to-json';
import Chat         from './Chat';
import { ChatMain } from './chatmain/ChatMain';
import { ChatMenu } from './chatmenu/ChatMenu';

const setup = (propOverrides) => {
  const props = Object.assign({
    main: ChatMain,
    menu: ChatMenu
  }, propOverrides);

  const component = <Chat {...props} />;

  return {
    props,
    component
  };
};

describe('<ChatMain />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const wrapper = shallow(component);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
