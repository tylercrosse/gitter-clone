import Message from '../models/Message';

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
  Message.create({
    username: action.username,
    text: action.text,
    rawMarkup: action.rawMarkup,
    convo: action.convo
  }).then((message) => {
    // console.log('✨ new message:', message);
    io.emit('action', { // FIXME better decouple db & socket interactions
      type: 'ADD_MESSAGE',
      message
    });
  }); // TODO error handling
};
