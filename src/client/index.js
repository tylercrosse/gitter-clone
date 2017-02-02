/* istanbul ignore next: hard to isolate */
import React    from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './components/Root.jsx';
import           './global.scss';

/* istanbul ignore next: tested elsewhere */
const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
