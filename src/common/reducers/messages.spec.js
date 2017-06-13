import messages, { message } from './messages';

describe('message reucer', () => {
  it('should handle ADD_MESSAGE', () => {
    expect(
      message({}, {
        type: 'ADD_MESSAGE',
        message: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          id: 0
        }
      })
    ).toMatchSnapshot('-> 1 message');
  });

  it('should return state for default switch case', () => {
    expect(
      message({}, {
        type: 'fooBar'
      })
    ).toMatchSnapshot('default');
  });
});

describe('messages reducer', () => {
  it('should handle initial state', () => {
    expect(
      messages(undefined, {})
    ).toEqual({});
  });

  it('should return state for default switch case', () => {
    expect(
      messages({}, {
        type: 'fooBar'
      })
    ).toMatchSnapshot('default');
  });

  it('should handle fetch payload', () => {
    let action = {};
    expect(messages({}, action)).toMatchSnapshot('no payload');
    action = {
      payload: {
        entities: { messages: {}}
      }
    };
    expect(messages({}, action)).toMatchSnapshot('with payload');
  });

  it('should handle ADD_MESSAGE', () => {
    expect(
      messages({}, {
        type: 'ADD_MESSAGE',
        message: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          id: 0
        }
      })
    ).toMatchSnapshot('-> 1 message');

    expect(
      messages({
        0: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          id: 0
        }
      }, {
        type: 'ADD_MESSAGE',
        message: {
          // 1 min later, same burst
          createdAt: '2017-02-01T09:01:00-08:00',
          username: 'dan',
          text: 'Use Redux',
          id: 1
        }
      })
    ).toMatchSnapshot('-> 2 messages');

    expect(
      messages({
        0: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          id: 0
        },
        1: {
          // 1 min later, same burst
          createdAt: '2017-02-01T09:01:00-08:00',
          username: 'dan',
          text: 'Use Redux',
          id: 1
        }
      }, {
        type: 'ADD_MESSAGE',
        message: {
           // 20 min later, new burst
          createdAt: '2017-02-01T09:20:00-08:00',
          username: 'dan',
          text: 'Fix the tests',
          id: 2
        }
      })
    ).toMatchSnapshot('-> 3 messages');
  });
});
