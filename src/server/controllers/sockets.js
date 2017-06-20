import logger from '../config/logger';
import * as messageCtlr from './messages';

export const socketActions = (io, action) => {
  switch (action.type) {
    case 'server.ADD_MESSAGE': messageCtlr.addMessage(io, action);
      break;
    case 'server.ADD_TYPING_USER':
      // NOTE use 'broadcast' to emit to all clients not including source. emit used for development
      // namespace to convo
      // logger.debug('add 🔫', action.payload);
      io.emit('action', {
        type: 'ADD_TYPING_USER',
        payload: action.payload
      });
      break;
    case 'server.REMOVE_TYPING_USER':
      // NOTE use 'broadcast' to emit to all clients not including source. emit used for development
      // namespace to convo
      // logger.debug('remove 🏁', action.payload);
      io.emit('action', {
        type: 'REMOVE_TYPING_USER',
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
