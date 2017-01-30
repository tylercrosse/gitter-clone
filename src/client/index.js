import React    from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root.jsx';
import           './global.scss';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
