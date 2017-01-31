import React, { PropTypes }     from 'react';
import { Provider }             from 'react-redux';
import { Router,
  Route,
  IndexRoute,
  browserHistory }              from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App     from './App.jsx';
import Chat    from './chat/Chat.jsx';
import Welcome from './Welcome.jsx';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={Welcome} />
          <Route path="/(:chat)" component={Chat} />
        </Route>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
