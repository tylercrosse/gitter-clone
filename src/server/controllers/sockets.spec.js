import { socketActions } from './sockets';
import logger from '../config/logger';
import * as messageCtlr from './messages';
import * as convosCtlr from './convos';

describe('sockets controller', () => {
  it('should handle server.ADD_MESSAGE', () => {
    const action = {
      type: 'server.ADD_MESSAGE',
      id: 0,
      username: 'josh',
      text: 'hey'
    };
    messageCtlr.addMessage = jest.fn();
    socketActions({}, action);
    expect(messageCtlr.addMessage)
      .toHaveBeenCalledWith({}, action);
  });

  it('should handle server.ADD_CONVO', () => {
    const action = {
      type: 'server.ADD_CONVO',
      id: 0,
      name: 'redux'
    };
    convosCtlr.addConvo = jest.fn();
    socketActions({}, action);
    expect(convosCtlr.addConvo)
      .toHaveBeenCalledWith({}, action);
  });

  it('should handle server.ADD_TYPING_USER', () => {
    const io = {
      emit: jest.fn()
    };
    const action = {
      type: 'server.ADD_TYPING_USER',
      payload: 'redux'
    };
    socketActions(io, action);
    expect(io.emit)
      .toHaveBeenCalledWith('action', {
        type: 'ADD_TYPING_USER',
        payload: action.payload
      });
  });

  it('should handle server.REMOVE_TYPING_USER', () => {
    const io = {
      emit: jest.fn()
    };
    const action = {
      type: 'server.REMOVE_TYPING_USER',
      payload: 'redux'
    };
    socketActions(io, action);
    expect(io.emit)
      .toHaveBeenCalledWith('action', {
        type: 'REMOVE_TYPING_USER',
        payload: action.payload
      });
  });

  it('should handle unknown actions', () => {
    const action = {type: 'FooBar'};
    logger.log = jest.fn();
    socketActions({}, action);
    expect(logger.log)
      .toHaveBeenCalledWith('error', 'Unknown action ', action);
  });
});
