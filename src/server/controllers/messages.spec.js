import Message from '../models/Message';
import Convo   from '../models/Convo';
import * as messageCtlr from './messages';

const setup = () => {
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
  Convo.populate = jest.fn().mockReturnThis();
  Convo.then = jest.fn().mockReturnThis();
  Convo.catch = jest.fn().mockReturnThis();

  return {
    io,
    action
  };
};

describe('messages controller', () => {
  xdescribe('getMessages', () => {
    it('should res with json messages when chat exists', () => {
      const req = { params: {convo: 'chat'} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      setup();
      Convo.then = jest.fn(function cb(callback) {
        callback({messages: {text: 'dummy message'}});
        return this;
      });

      messageCtlr.getMessages(req, res);

      expect(Convo.findOne).toHaveBeenCalledWith({name: req.params.convo});
      expect(Convo.populate).toHaveBeenCalledTimes(1);
      expect(Convo.then).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({text: 'dummy message'});
      expect(res.status).toHaveBeenCalledTimes(0);
      expect(res.send).toHaveBeenCalledTimes(0);
    });
    it('should res with 404 when chat does not exist', () => {
      const req = { params: {convo: 'chat'} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      setup();
      Convo.then = jest.fn(function cb(callback) {
        callback(null);
        return this;
      });

      messageCtlr.getMessages(req, res);

      expect(Convo.findOne).toHaveBeenCalledWith({name: req.params.convo});
      expect(Convo.populate).toHaveBeenCalledTimes(1);
      expect(Convo.then).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Chat not found');
    });
  });

  xdescribe('addMessage', () => {
    it('should find a convo', () => {
      const { io, action } = setup();

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
      const message = {id: 1};
      Message.create = jest.fn().mockReturnThis();
      Message.then = jest.fn((callback) => callback(message));

      const returnVal = messageCtlr.pvt._createMessage(doc, convo);
      expect(Message.create).toHaveBeenCalledWith(doc);
      expect(Message.then).toHaveBeenCalledTimes(1);
      expect(convo.messages.addToSet).toHaveBeenCalledWith(message.id);
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
      const { io } = setup();
      const result = {message: 'test'};

      messageCtlr.pvt._emitAddMessage(io, result);
      expect(io.emit)
        .toHaveBeenCalledWith('action', {message: result.message, type: 'ADD_MESSAGE'});
    });
  });
});
