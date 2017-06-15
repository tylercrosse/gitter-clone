import marked from 'marked';
import markedConfig from '../config/markedConfig';
import logger from '../config/logger';

const Message = require('../models').Message;
const Convo = require('../models').Convo;

marked.setOptions(markedConfig);

export const getMessages = (req, res) => {
  Convo.find({
    where: { name: req.params.convo },
    include: [
      {
        model: Message,
        as: 'messages'
      }
    ]
  })
    .then((convo) => {
      if (convo === null) res.status(404).send('Chat not found');
      else res.json(convo.messages);
    })
    .catch(
      /* istanbul ignore next */ (err) => {
        logger.log('error', err);
      }
    );
};

export const addMessage = (io, action) => {
  const rawMarkup = marked(action.text);
  const content = {
    username: action.username,
    text: action.text,
    rawMarkup
  };

  Convo.findOne({ where: { name: action.convo } })
    .then(/* istanbul ignore next */ (convo) => _createMessage(content, convo))
    .then(/* istanbul ignore next */ (result) => _emitAddMessage(io, result))
    .catch(
      /* istanbul ignore next */ (err) => {
        logger.log('error', err);
      }
    );
};

const _createMessage = (content, convo) =>
  Message.create({
    ...content,
    convoId: convo.id
  });
const _emitAddMessage = (io, message) =>
  io.emit('action', {
    // FIXME better decouple db & socket interactions
    type: 'ADD_MESSAGE',
    message
  });

export const pvt = { _createMessage, _emitAddMessage };
