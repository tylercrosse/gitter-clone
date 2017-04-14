import shortid      from 'shortid';
import * as actions from './index';

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

  it('fetchMessages should create [CALL_API] action', () => {
    const convo = 'chat';
    expect(actions.fetchMessages(convo))
    .toMatchSnapshot();
  });

  it('addConvo should create ADD_CONVO action', () => {
    const convo = {name: 'chat'};
    expect(actions.addConvo(convo))
      .toMatchSnapshot();
  });

  it('fetchConvos should create [CALL_API] action', () => {
    expect(actions.fetchConvos())
      .toMatchSnapshot();
  });

  describe('signIn action creator', () => {
    it('should create SIGN_IN action', () => {
      const getState = () => ('Bob');
      const dispatch = jest.fn();
      const name = 'Dan';
      const id = shortid.generate();
      actions.signIn(name, id)(dispatch, getState);
      expect(dispatch)
        .toHaveBeenCalledWith({
          type: 'SIGN_IN',
          username: name,
          id
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

  it('openCreateRoomModal should create OPEN_CREATE_ROOM_MODAL action', () => {
    expect(actions.openCreateRoomModal())
      .toEqual({
        type: 'OPEN_CREATE_ROOM_MODAL',
      });
  });

  it('closeModal should create CLOSE_MODAL action', () => {
    expect(actions.closeModal())
      .toEqual({
        type: 'CLOSE_MODAL',
      });
  });
});
