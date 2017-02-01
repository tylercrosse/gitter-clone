import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import messages from './messages';
import user     from './user';

const rootReducer = combineReducers({
  messages,
  user,
  routing
});

export default rootReducer;
