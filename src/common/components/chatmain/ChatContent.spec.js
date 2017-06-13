import React       from 'react';
import { shallow, mount } from 'enzyme';
import { animateScroll }  from 'react-scroll';
import sinon       from 'sinon';
import renderer    from 'react-test-renderer';
import ChatItem    from './ChatItem';
import ChatContent from './ChatContent';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [
      {
        id: '58911c3e871fdf24f2079782',
        createdAt: '2017-01-31T23:22:38.808Z',
        username: 'liz',
        text: 'sweet',
        burstStart: true
      }, {
        id: '58917370eb323841b839f583',
        createdAt: '2017-02-01T05:34:40.591Z',
        username: 'dan',
        text: 'cool',
        burstStart: true
      }, {
        id: '5891737ceb323841b839f584',
        createdAt: '2017-02-01T05:34:52.011Z',
        username: 'dan',
        text: 'damn it',
        burstStart: false
      }
    ]
  }, propOverrides);
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

  describe('componentDidUpdate', () => {
    it('calls animateScroll.scrollToBottom() on update', () => {
      const { props } = setup();
      const wrapper = mount(<ChatContent {...props} />);
      const updateSpy = sinon.spy(ChatContent.prototype, 'componentDidUpdate');
      const scrollSpy = sinon.spy(animateScroll, 'scrollToBottom');
      wrapper.update();
      expect(updateSpy.calledOnce).toEqual(true);
      expect(scrollSpy.calledOnce).toEqual(true);
    });
  });
});
