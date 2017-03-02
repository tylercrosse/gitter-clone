import React, { PropTypes }     from 'react';
import { Provider }             from 'react-redux';
import { Router,
  Route,
  IndexRoute,
  browserHistory }              from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Welcome  from './welcome/Welcome.jsx';
import Explore  from './explore/Explore.jsx';
import Chat     from './Chat.jsx';
import ChatMain from './chatmain/ChatMain.jsx';
import ChatMenu from './chatmenu/ChatMenu.jsx';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Welcome} />
        <Route path="/" component={Chat} >
          <IndexRoute components={{main: Explore, menu: ChatMenu}} />
          <Route
          path="/explore"
          components={{main: Explore, menu: ChatMenu}}
          />
          <Route
          path="/:convo"
          components={{main: ChatMain, menu: ChatMenu}}
          />
        </Route>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
