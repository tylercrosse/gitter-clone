import logger from '../config/logger';
import * as messageCtlr from './messages';
import * as convoCtlr   from './convos';

export const socketActions = (io, action) => {
  switch (action.type) {
    case 'server.ADD_MESSAGE': messageCtlr.addMessage(io, action);
      break;
    case 'server.ADD_CONVO': convoCtlr.addConvo(io, action);
      break;
    case 'server.START_TYPING':
      // NOTE use 'broadcast' to emit to all clients not including source. emit used for development
      logger.debug('Start 🔫');
      io.emit('action', {
        type: 'START_TYPING',
        payload: action.payload
      });
      break;
    case 'server.STOP_TYPING':
      // NOTE use 'broadcast' to emit to all clients not including source. emit used for development
      logger.debug('Stop 🏁');
      io.emit('action', {
        type: 'STOP_TYPING',
        payload: action.payload
      });
      break;
    default:
      logger.log('error', 'Unknown action ', action);
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
