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
          text: 'Run the tests',
          _id: 0
        }
      })
    ).toEqual({
      0: {
        text: 'Run the tests',
        _id: 0
      }
    });

    expect(
      messages({
        0: {
          text: 'Run the tests',
          _id: 0
        }
      }, {
        type: 'ADD_MESSAGE',
        message: {
          text: 'Use Redux',
          _id: 1
        }
      })
    ).toEqual({
      0: {
        text: 'Run the tests',
        _id: 0
      },
      1: {
        text: 'Use Redux',
        _id: 1
      }
    });

    expect(
      messages({
        0: {
          text: 'Run the tests',
          _id: 0
        },
        1: {
          text: 'Use Redux',
          _id: 1
        }
      }, {
        type: 'ADD_MESSAGE',
        message: {
          text: 'Fix the tests',
          _id: 2
        }
      })
    ).toEqual({
      0: {
        text: 'Run the tests',
        _id: 0
      },
      1: {
        text: 'Use Redux',
        _id: 1
      },
      2: {
        text: 'Fix the tests',
        _id: 2
      }
    });
  });
});
