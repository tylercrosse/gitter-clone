import makeGetMessagesByConvo, {
  burstify } from './messagesByConvo';

const setup = (overrides) => (
  Object.assign({
    messages: {
      0: {
        _id: 0,
        createdAt: '2017-02-01T09:00:00-08:00',
        text: 'Run the tests',
        convo: 'chat',
      },
      1: {
        _id: 1,
        createdAt: '2017-02-01T09:01:00-08:00',
        text: 'Use Redux',
        convo: 'chat',
      },
      2: {
        _id: 2,
        createdAt: '2017-02-01T09:10:00-08:00',
        text: 'Fix the tests',
        convo: 'react',
      },
      3: {
        _id: 2,
        createdAt: '2017-02-01T09:20:00-08:00',
        text: 'Fix the tests',
        convo: 'chat',
      }
    }
  }, overrides));

describe('getMessagesByConvo selector', () => {
  it('should select desired messages from state', () => {
    const getMessagesByConvo = makeGetMessagesByConvo();
    expect(getMessagesByConvo(setup(), 'chat'))
      .toMatchSnapshot();
    expect(getMessagesByConvo(setup(), 'react'))
      .toMatchSnapshot();
  });

  it('should burstify messages', () => {
    const { messages } = setup();
    const msgA = Object.values(messages);
    expect(burstify(msgA)).toMatchSnapshot();
  });
});
