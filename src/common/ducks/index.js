import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import messages from './messages';
import convos from './convos';
import user from './user';
import ui from './ui';
import error from './error';

const rootReducer = combineReducers({
  messages,
  convos,
  user,
  ui,
  routing,
  error
});

export default rootReducer;
