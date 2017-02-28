import logger from '../config/logger';
import * as messageCtlr from './messages';
import * as convoCtlr   from './convos';

export const socketActions = (io, action) => {
  switch (action.type) {
    case 'server.ADD_MESSAGE': messageCtlr.addMessage(io, action);
      break;
    case 'server.ADD_CONVO': convoCtlr.addConvo(io, action);
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
