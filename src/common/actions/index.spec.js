import * as actions from './index';

describe('actions', () => {
  it('addConvo should create ADD_CONVO action', () => {
    const convo = {name: 'chat'};
    expect(actions.addConvo(convo))
      .toMatchSnapshot();
  });

  it('fetchConvos should create [CALL_API] action', () => {
    expect(actions.fetchConvos())
      .toMatchSnapshot();
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
