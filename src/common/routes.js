import React      from 'react';
import { Router,
  Route,
  browserHistory,
  IndexRoute }    from 'react-router';
import Welcome    from './components/welcome/Welcome.jsx';
import Explore    from './components/explore/Explore.jsx';
import Chat       from './components/Chat.jsx';
import ChatMain   from './components/chatmain/ChatMain.jsx';
import ChatMenu   from './components/chatmenu/ChatMenu.jsx';
import Generic404 from './components/errors/Generic404.jsx';

export const routes = (
  <Router history={browserHistory}>
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
    <Route path="*" component={Generic404} />
  </Router>
);

const Routes = () => (routes);

export default Routes;
