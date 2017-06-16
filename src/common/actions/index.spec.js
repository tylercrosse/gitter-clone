import shortid      from 'shortid';
import * as actions from './index';

describe('actions', () => {
  it('addMessage should create ADD_MESSAGE action', () => {
    const message = {
      userId: '1231231',
      text: 'Use Redux',
      rawMarkup: '<p>Use Redux</p>',
      convo: 'react'
    };
    expect(actions.addMessage(message))
      .toMatchSnapshot();
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

  it('signIn should create [CALL_API] action', () => {
    expect(actions.signIn({username: 'Dan'}))
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
