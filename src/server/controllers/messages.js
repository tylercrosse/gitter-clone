import Message from '../models/Message';

export const getMessages = (req, res) => {
  Message.find({}).then((messages) => {
    // console.log('⏺ messages: ', messages);
    res.json(messages);
  });
};

export const addMessage = (io, action) => {
  console.log('🍕', action);
  Message.create({
    username: action.username,
    text: action.text
  }).then((message) => {
    io.emit('action', {
      type: 'ADD_MESSAGE',
      message
    });
  }); // TODO error handling
};
