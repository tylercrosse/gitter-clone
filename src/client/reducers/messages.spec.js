import messages from './messages';

describe('messages reducer', () => {
  it('should handle initial state', () => {
    expect(
      messages(undefined, {})
    ).toEqual({});
  });

  it('should handle ADD_MESSAGE', () => {
    expect(
      messages({}, {
        type: 'ADD_MESSAGE',
        message: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          _id: 0
        }
      })
    ).toEqual({
      0: {
        burstStart: true,
        createdAt: '2017-02-01T09:00:00-08:00',
        username: 'dan',
        text: 'Run the tests',
        _id: 0
      }
    });

    expect(
      messages({
        0: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          _id: 0
        }
      }, {
        type: 'ADD_MESSAGE',
        message: {
          // 1 min later, same burst
          createdAt: '2017-02-01T09:01:00-08:00',
          username: 'dan',
          text: 'Use Redux',
          _id: 1
        }
      })
    ).toEqual({
      0: {
        createdAt: '2017-02-01T09:00:00-08:00',
        username: 'dan',
        burstStart: true,
        text: 'Run the tests',
        _id: 0
      },
      1: {
        createdAt: '2017-02-01T09:01:00-08:00',
        username: 'dan',
        burstStart: false,
        text: 'Use Redux',
        _id: 1
      }
    });

    expect(
      messages({
        0: {
          createdAt: '2017-02-01T09:00:00-08:00',
          username: 'dan',
          text: 'Run the tests',
          _id: 0
        },
        1: {
          // 1 min later, same burst
          createdAt: '2017-02-01T09:01:00-08:00',
          username: 'dan',
          text: 'Use Redux',
          _id: 1
        }
      }, {
        type: 'ADD_MESSAGE',
        message: {
           // 20 min later, new burst
          createdAt: '2017-02-01T09:20:00-08:00',
          username: 'dan',
          text: 'Fix the tests',
          _id: 2
        }
      })
    ).toEqual({
      0: {
        createdAt: '2017-02-01T09:00:00-08:00',
        username: 'dan',
        burstStart: true,
        text: 'Run the tests',
        _id: 0
      },
      1: {
        createdAt: '2017-02-01T09:01:00-08:00',
        username: 'dan',
        burstStart: false,
        text: 'Use Redux',
        _id: 1
      },
      2: {
        createdAt: '2017-02-01T09:20:00-08:00',
        username: 'dan',
        burstStart: true,
        text: 'Fix the tests',
        _id: 2
      }
    });
  });
});
