import Message from '../models/Message';
import Convo   from '../models/Convo';

export const getMessages = (req, res) => {
  // TODO error handling, bad request
  Message.find({convo: req.params.convo})
    .then((messages) => {
      res.json(messages);
    })
    .catch(/* istanbul ignore next */(err) => {
      console.log('❌', err); // TODO error handling, db error
    });
};

export const addMessage = (io, action) => {
  const doc = {
    username: action.username,
    text: action.text,
    rawMarkup: action.rawMarkup,
    convo: action.convo
  };

  Convo.findOne({name: action.convo})
    .then(/* istanbul ignore next */(convo) => (_createMessage(doc, convo)))
    .then(_saveConvo)
    .then(/* istanbul ignore next */(result) => (_emitAddMessage(io, result)))
    .catch(/* istanbul ignore next */(err) => {
      console.log('❌', err); // TODO error handling, db error
    });
};

const _createMessage = (doc, convo) => (
  Message.create(doc).then((message) => {
    convo.messages.addToSet(message._id);
    return {convo, message};
  }));
const _saveConvo = (result) => (
  result.convo.save().then((updatdConvo) => {
    return Object.assign(result, updatdConvo);
  }));
const _emitAddMessage = (io, { message }) => (
  io.emit('action', { // FIXME better decouple db & socket interactions
    type: 'ADD_MESSAGE',
    message
  }));

export const pvt = {_createMessage, _saveConvo, _emitAddMessage};
