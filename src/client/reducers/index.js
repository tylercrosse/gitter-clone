import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import messages from './messages';
import convos   from './convos';
import user     from './user';
import ui       from './ui';

const rootReducer = combineReducers({
  messages,
  convos,
  user,
  ui,
  routing
});

export default rootReducer;
