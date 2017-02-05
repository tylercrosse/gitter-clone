import Message from '../models/Message';

export const getMessages = (req, res) => {
  Message.find({}).then((messages) => {
    // console.log('⏺ messages: ', messages);
    res.json(messages);
  }); // TODO error handling
};

export const addMessage = (io, action) => {
  // console.log('🍕', action);
  Message.create({
    username: action.username,
    text: action.text
  }).then((message) => {
    io.emit('action', { // FIXME better decouple db & socket interactions
      type: 'ADD_MESSAGE',
      message
    });
  }); // TODO error handling
};
