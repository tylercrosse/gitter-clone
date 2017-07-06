import React       from 'react';
import { Provider }   from 'react-redux';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { animateScroll }  from 'react-scroll';
import sinon       from 'sinon';
import ChatItem    from './ChatItem';
import ChatContent from './ChatContent';
import configureStore from '../../store/configureStore';

const setup = (propOverrides) => {
  const props = Object.assign({
    messages: [
      {
        id: '58911c3e871fdf24f2079782',
        createdAt: '2017-01-31T23:22:38.808Z',
        User: {name: 'liz'},
        text: 'sweet',
        rawMarkup: '<p>sweet</p>',
        burstStart: true
      }, {
        id: '58917370eb323841b839f583',
        createdAt: '2017-02-01T05:34:40.591Z',
        User: {name: 'dan'},
        text: 'cool',
        rawMarkup: '<p>cool</p>',
        burstStart: true
      }, {
        id: '5891737ceb323841b839f584',
        createdAt: '2017-02-01T05:34:52.011Z',
        User: {name: 'dan'},
        text: 'damn it',
        rawMarkup: '<p>damn it</p>',
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
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a <ChatItem /> for each message', () => {
    const { wrapper } = setup();
    expect(wrapper.find(ChatItem))
      .toHaveLength(3);
  });

  describe('componentDidUpdate', () => {
    it('calls animateScroll.scrollToBottom() on update', () => {
      const { props } = setup();
      const mockStore = configureStore();
      const wrapper = mount(
        <Provider store={mockStore}>
          <ChatContent {...props} />
        </Provider>
      );
      const updateSpy = sinon.spy(ChatContent.prototype, 'componentDidUpdate');
      const scrollSpy = sinon.spy(animateScroll, 'scrollToBottom');
      wrapper.update();
      expect(updateSpy.calledOnce).toEqual(true);
      expect(scrollSpy.calledOnce).toEqual(true);
    });
  });
});
