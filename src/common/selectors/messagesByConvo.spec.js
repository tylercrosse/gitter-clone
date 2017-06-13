import makeGetMessagesByConvoId, {
  burstify } from './messagesByConvo';

const setup = (overrides) => (
  Object.assign({
    messages: {
      0: {
        id: 0,
        createdAt: '2017-02-01T09:00:00-08:00',
        text: 'Run the tests',
        convo: 'chat',
      },
      1: {
        id: 1,
        createdAt: '2017-02-01T09:01:00-08:00',
        text: 'Use Redux',
        convo: 'chat',
      },
      2: {
        id: 2,
        createdAt: '2017-02-01T09:10:00-08:00',
        text: 'Fix the tests',
        convo: 'react',
      },
      3: {
        id: 2,
        createdAt: '2017-02-01T09:20:00-08:00',
        text: 'Fix the tests',
        convo: 'chat',
      }
    }
  }, overrides));

describe('getMessagesByConvoId selector', () => {
  it('should select desired messages from state', () => {
    const getMessagesByConvoId = makeGetMessagesByConvoId();
    expect(getMessagesByConvoId(setup(), 'chat'))
      .toMatchSnapshot();
    expect(getMessagesByConvoId(setup(), 'react'))
      .toMatchSnapshot();
  });

  it('should burstify messages', () => {
    const { messages } = setup();
    const msgA = Object.values(messages);
    expect(burstify(msgA)).toMatchSnapshot();
  });
});
