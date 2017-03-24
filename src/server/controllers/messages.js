import marked       from 'marked';
import markedConfig from '../config/markedConfig';
import logger       from '../config/logger';
import Message      from '../models/Message';
import Convo        from '../models/Convo';

marked.setOptions(markedConfig);

export const getMessages = (req, res) => {
  Convo.findOne({name: req.params.convo})
    .populate('messages')
    .then((convo) => {
      if (convo === null) res.status(404).send('Chat not found');
      else res.json(convo.messages);
    })
    .catch(/* istanbul ignore next */(err) => {
      logger.log('error', err);
    });
};

export const addMessage = (io, action) => {
  const rawMarkup = marked(action.text);
  const doc = {
    username: action.username,
    text: action.text,
    rawMarkup,
    convo: action.convo
  };

  Convo.findOne({name: action.convo})
    .then(/* istanbul ignore next */(convo) => (_createMessage(doc, convo)))
    .then(_saveConvo)
    .then(/* istanbul ignore next */(result) => (_emitAddMessage(io, result)))
    .catch(/* istanbul ignore next */(err) => {
      logger.log('error', err);
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
