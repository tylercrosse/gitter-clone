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
        signIn: true
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

export const addTypingUserHelper = (usersTyping, action) => (
  usersTyping.indexOf(action.payload.username) >= 0
    ? usersTyping
    : usersTyping.concat(action.payload.username));


export const removeTypingUserHelper = (usersTyping, action) => (
  usersTyping.filter((username) => username !== action.payload.username)
);

export const usersTyping = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TYPING_USER:
      return addTypingUserHelper(state, action);
    case ActionTypes.REMOVE_TYPING_USER:
      return removeTypingUserHelper(state, action);
    default:
      return state;
  }
};

const ui = combineReducers({
  modalIsOpen,
  isFetching,
  usersTyping
});

export default ui;
