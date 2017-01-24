import Message from '../models/Message';

export const getMessages = (req, res) => {
  Message.find({}).then((messages) => {
    console.log('⏺ messages: ', messages);
    res.json(messages);
  });
};

// some actions on Message model may be in sockets controller
