import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

export const modalIsOpen = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return true;
    case ActionTypes.CLOSE_MODAL:
      return false;
    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.MESSAGES_REQUEST:
      return true;
    case ActionTypes.MESSAGES_SUCCESS:
    case ActionTypes.MESSAGES_FAILURE:
      return false;
    default:
      return state;
  }
};

const ui = combineReducers({
  modalIsOpen,
  isFetching
});

export default ui;
