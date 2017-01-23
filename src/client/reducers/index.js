import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messages';
import user from './user';

const chatApp = combineReducers({
  messages,
  user,
  routing: routerReducer
});

export default chatApp;
