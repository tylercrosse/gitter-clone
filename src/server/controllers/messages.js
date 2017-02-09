import Message from '../models/Message';
import Convo   from '../models/Convo';

export const getMessages = (req, res) => {
  // console.log('💬 convo:', req.params.convo);
  Message
    .find({convo: req.params.convo})
    .then((messages) => {
      // console.log('⏺ messages: ', messages);
      res.json(messages);
    }); // TODO error handling
};

export const addMessage = (io, action) => {
  // console.log('🍕 action:', action);
  const doc = {
    username: action.username,
    text: action.text,
    rawMarkup: action.rawMarkup,
    convo: action.convo
  };

  Convo.findOne({name: action.convo}, (err, convo) => {
    if (err) console.log(err); // TODO error handling
    // console.log('💬 original convo:', convo);

    Message.create(doc, (err, message) => {
      if (err) console.log(err); // TODO error handling

      convo.messages.addToSet(message._id);
      convo.save((err) => {
        if (err) console.log(err); // TODO error handling
        // console.log('💬 updated convo:', convo, convo.messages);
        // console.log('✨ new message:', message);
        io.emit('action', { // FIXME better decouple db & socket interactions
          type: 'ADD_MESSAGE',
          message
        });
      });
    });
  });
};

// error handling
// - Convo find
// - message create
// - convo update
// - io?

