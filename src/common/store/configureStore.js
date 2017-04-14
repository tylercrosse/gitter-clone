import { createStore,
  applyMiddleware }             from 'redux';
import thunk                    from 'redux-thunk';
import { browserHistory }       from 'react-router';
import { routerMiddleware }     from 'react-router-redux';
import { composeWithDevTools }  from 'redux-devtools-extension/developmentOnly';
import createSocketIoMiddleware from 'redux-socket.io';
import io                       from 'socket.io-client';
import { apiMiddleware }        from 'redux-api-middleware';
import rootReducer              from '../reducers/';

const socket = io('');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server.');

const middlewares = [
  thunk,
  apiMiddleware,
  socketIoMiddleware,
  routerMiddleware(browserHistory)
];

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/', () => {
      const nextRootReducer = require('../reducers/').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
