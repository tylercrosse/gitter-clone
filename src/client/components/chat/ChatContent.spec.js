import React       from 'react';
import { shallow } from 'enzyme';
import renderer    from 'react-test-renderer';
import ChatItem    from './ChatItem.jsx';
import ChatContent from './ChatContent.jsx';

const setup = () => {
  const props = {
    messages: {
      '58911c3e871fdf24f2079782': {
        _id: '58911c3e871fdf24f2079782',
        createdAt: '2017-01-31T23:22:38.808Z',
        username: 'liz',
        text: 'sweet',
        burstStart: true
      },
      '58917370eb323841b839f583': {
        _id: '58917370eb323841b839f583',
        createdAt: '2017-02-01T05:34:40.591Z',
        username: 'dan',
        text: 'cool',
        burstStart: true
      },

      '5891737ceb323841b839f584': {
        _id: '5891737ceb323841b839f584',
        createdAt: '2017-02-01T05:34:52.011Z',
        username: 'dan',
        text: 'damn it',
        burstStart: false
      }
    }
  };
  const component = <ChatContent {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    component,
    wrapper
  };
};

describe('<ChatContent />', () => {
  it('should render correctly', () => {
    const { component } = setup();
    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <ChatItem /> for each message', () => {
    const { wrapper } = setup();
    expect(wrapper.find(ChatItem))
      .toHaveLength(3);
  });
});

