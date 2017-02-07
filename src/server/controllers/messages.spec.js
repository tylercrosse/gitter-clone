import Message from '../models/Message';
import * as messagesCtlr from './messages';

describe('messages controller', () => {
  it('should get messages', () => {
    const req = { params: { } };
    const res = {
      json: jest.fn()
    };
    Message.find = jest.fn(function() { return this; });
    Message.then = jest.fn((callback) => callback('dummy message'));
    messagesCtlr.getMessages(req, res);
    expect(Message.find).toHaveBeenCalledTimes(1);
    expect(Message.then).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith('dummy message');
  });

  it('should add messages', () => {
    const io = {
      emit: jest.fn()
    };
    const action = {
      name: 'chat'
    };
    Message.create = jest.fn(function() { return this; });
    Message.then = jest.fn((callback) => callback('dummy message'));
    messagesCtlr.addMessage(io, action);
    expect(Message.create).toHaveBeenCalledTimes(1);
    expect(Message.then).toHaveBeenCalledTimes(1);
    expect(io.emit)
      .toHaveBeenCalledWith('action', {message: 'dummy message', type: 'ADD_MESSAGE'});
  });
});
