import { createStore, compose, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers/';

const socket = io('');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server.');

const middlewares = [
  thunk,
  apiMiddleware,
  socketIoMiddleware,
  routerMiddleware(browserHistory)
];

const createStoreWithMiddleWare = compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
)(createStore);

const configureStore = (initialState) => (
  createStoreWithMiddleWare(rootReducer, initialState)
);

export default configureStore;
