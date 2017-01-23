import { createStore, compose, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import chatApp from './reducers/';

const socket = io('');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server.');

export default function configureStore() {
  const middlewares = [
    thunk,
    socketIoMiddleware,
    routerMiddleware(browserHistory)
  ];

  return createStore(
    chatApp,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
  );
}
