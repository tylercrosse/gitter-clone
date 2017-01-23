// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import * as actions from './index';

// const setup = () => {
//   const middlewares = [thunk];
//   const mockStore = configureMockStore(middlewares);
//
//   return {
//     mockStore
//   };
// };

describe('actions', () => {
  it('addMessage should create ADD_MESSAGE action', () => {
    const message = {
      username: 'Bob',
      text: 'Use Redux'
    };
    expect(actions.addMessage(message))
      .toEqual({
        type: 'server.ADD_MESSAGE',
        id: 0,
        username: 'Bob',
        text: 'Use Redux'
      });
  });

  describe('signIn action creator', () => {
    it('should create SIGN_IN action', () => {
      const getState = () => ('Bob');
      const dispatch = jest.fn();
      actions.signIn()(dispatch, getState);
      expect(dispatch)
        .toHaveBeenCalledWith({
          type: 'SIGN_IN',
          username: undefined
        });
    });

    it('should create @@router/CALL_HISTORY_METHOD action', () => {
      const getState = () => ('Bob');
      const dispatch = jest.fn();
      actions.signIn()(dispatch, getState);
      expect(dispatch)
        .toHaveBeenCalledWith({
          payload: {
            args: ['/chat'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        });
    });
  });
});
