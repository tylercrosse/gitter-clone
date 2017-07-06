import { combineReducers } from 'redux';
import {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  MESSAGES_FAILURE
} from './messages';
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

const initialPanelState = {
  open: false,
  title: '',
  inner: ''
};

export const panel = (state = initialPanelState, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_CONVOS_PANEL:
      return {
        open: true,
        title: 'All Conversations',
        inner: 'Conversations'
      };
    case ActionTypes.OPEN_DIRECT_MESSAGES_PANEL:
      return {
        open: true,
        title: 'Direct Messages',
        inner: 'DirectMessages'
      };
    case ActionTypes.CLOSE_PANEL:
      return initialPanelState;
    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case MESSAGES_REQUEST:
      return true;
    case MESSAGES_SUCCESS:
    case MESSAGES_FAILURE:
      return false;
    default:
      return state;
  }
};

export const addTypingUserHelper = (usersTyping, action) =>
  usersTyping.indexOf(action.payload.username) >= 0
    ? usersTyping
    : usersTyping.concat(action.payload.username);

export const removeTypingUserHelper = (usersTyping, action) =>
  usersTyping.filter((username) => username !== action.payload.username);

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
  panel,
  isFetching,
  usersTyping
});

export default ui;
