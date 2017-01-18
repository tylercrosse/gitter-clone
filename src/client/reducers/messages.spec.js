import messages from './messages';

describe('messages reducer', () => {
  it('should handle initial state', () => {
    expect(
      messages(undefined, {})
    ).toEqual([]);
  });

  it('should handle ADD_MESSAGE', () => {
    expect(
      messages([], {
        type: 'ADD_MESSAGE',
        text: 'Run the tests',
        id: 0
      })
    ).toEqual([
      {
        text: 'Run the tests',
        id: 0
      }
    ]);

    expect(
      messages([
        {
          text: 'Run the tests',
          id: 0
        }
      ], {
        type: 'ADD_MESSAGE',
        text: 'Use Redux',
        id: 1
      })
    ).toEqual([
      {
        text: 'Run the tests',
        id: 0
      }, {
        text: 'Use Redux',
        id: 1
      }
    ]);

    expect(
      messages([
        {
          text: 'Run the tests',
          id: 0
        }, {
          text: 'Use Redux',
          id: 1
        }
      ], {
        type: 'ADD_MESSAGE',
        text: 'Fix the tests',
        id: 2
      })
    ).toEqual([
      {
        text: 'Run the tests',
        id: 0
      }, {
        text: 'Use Redux',
        id: 1
      }, {
        text: 'Fix the tests',
        id: 2
      }
    ]);
  });
});
