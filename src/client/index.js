import React          from 'react';
import ReactDOM       from 'react-dom';
import { Provider }   from 'react-redux';
import configureStore from '../common/store/configureStore';
import Routes         from '../common/Routes';
import                     './styles/global.scss';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
