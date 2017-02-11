// import rewire  from 'rewire';
// import Promise from 'bluebird';
import Message from '../models/Message';
import Convo   from '../models/Convo';
import * as messageCtlr from './messages';

// const messageCtlr = rewire('./messages');

describe('messages controller', () => {
  it('should get messages', () => {
    const req = { params: {convo: 'chat'} };
    const res = {
      json: jest.fn()
    };
    Message.find = jest.fn().mockReturnThis();
    Message.then = jest.fn(function cb(callback) {
      callback('dummy message');
      return this;
    });
    Message.catch = jest.fn().mockReturnThis();

    messageCtlr.getMessages(req, res);
    expect(Message.find).toHaveBeenCalledWith({convo: req.params.convo});
    expect(Message.then).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith('dummy message');
  });

  describe('addMessage', () => {
    it('should find a convo', () => {
      const io = {
        emit: jest.fn()
      };
      const action = {
        username: 'amy',
        text: 'hey',
        rawMarkup: '<p>hey</p>\n',
        convo: 'chat',
      };
      Convo.findOne = jest.fn().mockReturnThis();
      Convo.then = jest.fn().mockReturnThis();
      Convo.catch = jest.fn().mockReturnThis();

      messageCtlr.addMessage(io, action);
      expect(Convo.findOne).toHaveBeenCalledWith({name: action.convo});
      expect(Convo.then).toHaveBeenCalledTimes(3);
      expect(Convo.catch).toHaveBeenCalledTimes(1);
    });
    it('should create a message with convo ref', () => {
      const doc = {};
      const convo = {messages: {
        addToSet: jest.fn()
      }};
      const message = {_id: 1};
      Message.create = jest.fn().mockReturnThis();
      Message.then = jest.fn((callback) => callback(message));

      const returnVal = messageCtlr.pvt._createMessage(doc, convo);
      expect(Message.create).toHaveBeenCalledWith(doc);
      expect(Message.then).toHaveBeenCalledTimes(1);
      expect(convo.messages.addToSet).toHaveBeenCalledWith(message._id);
      expect(returnVal).toEqual({convo, message});
    });
    it('should update convo with message ref', () => {
      const result = {convo: {
        save: jest.fn().mockReturnThis(),
        then: jest.fn((callback) => callback('test'))
      }};

      const returnVal = messageCtlr.pvt._saveConvo(result);
      expect(result.convo.save).toHaveBeenCalledTimes(1);
      expect(result.convo.then).toHaveBeenCalledTimes(1);
      expect(returnVal).toEqual(Object.assign(result, 'test'));
    });
    it('should call io.emit with type: ADD_MESSAGE', () => {
      const io = {
        emit: jest.fn()
      };
      const result = {message: 'test'};

      messageCtlr.pvt._emitAddMessage(io, result);
      expect(io.emit)
        .toHaveBeenCalledWith('action', {message: result.message, type: 'ADD_MESSAGE'});
    });
  });
});
