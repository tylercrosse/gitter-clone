/* istanbul ignore next: hard to isolate */
import React    from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/store/configureStore';
import Root from '../common/components/Root.jsx';
// import           '../common/global.scss';

/* istanbul ignore next: tested elsewhere */
const store = configureStore();

if (module.hot) {
  module.hot.accept('../common/reducers/', () => {
    const nextRootReducer = require('../common/reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
