import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

const initialModalState = {
  createRoom: false,
  signIn: false
};

export const modalIsOpen = (state = initialModalState, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_CREATE_ROOM_MODAL:
      return {
        createRoom: true,
        signIn: false
      };
    case ActionTypes.OPEN_SIGN_IN_MODAL:
      return {
        createRoom: false,
        signIn: true,
      };
    case ActionTypes.CLOSE_MODAL:
      return {
        createRoom: false,
        signIn: false
      };
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

const isTyping = (state = 'Dan', action) => {
  switch (action.type) {
    case ActionTypes.START_TYPING:
      return action.payload.username;
    case ActionTypes.STOP_TYPING:
      return '';
    default:
      return state;
  }
};

const ui = combineReducers({
  modalIsOpen,
  isFetching,
  isTyping
});

export default ui;
