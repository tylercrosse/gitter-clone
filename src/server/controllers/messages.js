import Message from '../models/Message';
import Convo   from '../models/Convo';

export const getMessages = (req, res) => {
  // TODO error handling, bad request
  // console.log('💬 convo:', req.params.convo);
  Message
    .find({convo: req.params.convo})
    .then((messages) => {
      // console.log('⏺ messages: ', messages);
      res.json(messages);
    })
    .catch((err) => {
      console.log('❌', err); // TODO error handling, db error
    });
};

export const addMessage = (io, action) => {
  // console.log('🍕 action:', action);
  const doc = {
    username: action.username,
    text: action.text,
    rawMarkup: action.rawMarkup,
    convo: action.convo
  };

  Convo.findOne({name: action.convo}).exec()
    .then((convo) => {
      // console.log('💬 original convo:', convo);
      return Message.create(doc).then((message) => {
        convo.messages.addToSet(message._id);
        return {convo, message};
      });
    })
    .then((result) => {
      const { convo } = result;
      return convo.save().then((updatdConvo) => {
        // console.log('💬 updated convo:', updatedConvo);
        return Object.assign(result, updatdConvo);
      });
    })
    .then((result) => {
      const { message } = result;
      // console.log('✨ new message:', message);
      io.emit('action', { // FIXME better decouple db & socket interactions
        type: 'ADD_MESSAGE',
        message
      });
    })
    .catch((err) => {
      console.log('❌', err); // TODO error handling, db error
    });
};

// error handling
// - Convo find
// - message create
// - convo update
// - io?
