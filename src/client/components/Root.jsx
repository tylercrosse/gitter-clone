import React, { PropTypes } from 'react';
import { Provider }    from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App.jsx';
import Welcome from './Welcome.jsx'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Welcome} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
