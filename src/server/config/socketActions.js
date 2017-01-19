import { v4 } from 'node-uuid';

const socketActions = (io) => {
  io.on('connection', (socket) => {
    socket.on('action', (action) => {
      if (action.type === 'server.ADD_MESSAGE') {
        console.log('🍕: ', action);
        io.emit('action', {
          type: 'ADD_MESSAGE',
          text: action.text,
          id: v4()
        });
      }
    });
  });
};

export default socketActions;
