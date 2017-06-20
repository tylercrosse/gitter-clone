import marked from 'marked';
import markedConfig from '../config/markedConfig';
import logger from '../config/logger';

const Message = require('../models').Message;
const Convo = require('../models').Convo;
const User = require('../models').User;

marked.setOptions(markedConfig);

export const getMessages = (req, res) => {
  Convo.find({
    where: { name: req.params.convo },
    include: [
      {
        model: Message,
        as: 'messages',
        include: [User]
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
        res.status(500).send('Something went wrong!');
      }
    );
};

export const addMessage = (io, action) => {
  const rawMarkup = marked(action.text);
  const content = {
    userId: action.userId,
    text: action.text,
    rawMarkup
  };


  Convo.findOne({ where: { name: action.convo } })
    .then(/* istanbul ignore next */ (convo) => _createMessage(content, convo))
    .then(/* istanbul ignore next */ (message) => _eagerLoadMessage(message))
    .then(/* istanbul ignore next */ (message) => _emitAddMessage(io, message))
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
const _eagerLoadMessage = (message) =>
  // neeeded to get eager loading to work (sequelize bug)
  Message.find({
    where: {id: message.id},
    include: [User]
  });
const _emitAddMessage = (io, message) => {
  io.emit('action', {
    // FIXME better decouple db & socket interactions
    type: 'ADD_MESSAGE',
    message
  });
};

export const pvt = { _createMessage, _emitAddMessage };
