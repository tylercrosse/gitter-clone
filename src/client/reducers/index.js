import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';

const chatApp = combineReducers({
  messages,
  user
});

export default chatApp;
