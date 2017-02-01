import Message from '../models/Message';

const socketActions = (io) => {
  io.on('connection', (socket) => {
    socket.on('action', (action) => {
      if (action.type === 'server.ADD_MESSAGE') {
        console.log('🐕 action: ', action);
        Message.create({
          username: action.username,
          text: action.text
        }).then((message) => {
          console.log('🍕 message: ', message);
          io.emit('action', {
            type: 'ADD_MESSAGE',
            message
          });
        });
      }
    });
  });
};

export default socketActions;
