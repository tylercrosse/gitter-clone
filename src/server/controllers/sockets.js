import * as messageCtlr from './messages';

export const socketActions = (io, action) => {
  switch (action.type) {
    case 'server.ADD_MESSAGE': messageCtlr.addMessage(io, action);
      break;
    default:
      throw new Error('Unknown action'); // TODO better error handling
  }
};

const socketCtlr = (io) => {
  /* istanbul ignore next: module functionality */
  io.on('connection', (socket) => {
    /* istanbul ignore next: module functionality */
    socket.on('action', (action) => {
      socketActions(io, action);
    });
  });
};

export default socketCtlr;
