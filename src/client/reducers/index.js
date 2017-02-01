import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import bursts   from './bursts';
import messages from './messages';
import user     from './user';

const rootReducer = combineReducers({
  bursts,
  messages,
  user,
  routing
});

export default rootReducer;
