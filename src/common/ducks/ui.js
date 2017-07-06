import { combineReducers } from 'redux';
import {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  MESSAGES_FAILURE
} from './messages';

// actions
export const ADD_TYPING_USER = 'ADD_TYPING_USER';
export const REMOVE_TYPING_USER = 'REMOVE_TYPING_USER';

export const OPEN_CREATE_ROOM_MODAL = 'OPEN_CREATE_ROOM_MODAL';
export const OPEN_SIGN_IN_MODAL = 'OPEN_SIGN_IN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const OPEN_CONVOS_PANEL = 'OPEN_CONVOS_PANEL';
export const OPEN_DIRECT_MESSAGES_PANEL = 'OPEN_DIRECT_MESSAGES_PANEL';
export const CLOSE_PANEL = 'CLOSE_PANEL';

// action creators
export const addTypingUser = ({ username }) => ({
  type: 'server.' + ADD_TYPING_USER,
  payload: {
    username
  }
});

export const removeTypingUser = ({ username }) => ({
  type: 'server.' + REMOVE_TYPING_USER,
  payload: {
    username
  }
});

export const openCreateRoomModal = () => ({
  type: OPEN_CREATE_ROOM_MODAL
});

export const openSignInModal = () => ({
  type: OPEN_SIGN_IN_MODAL
});

export const closeModal = () => (dispatch) => {
  dispatch(closeModalAction());
  dispatch(closePanel());
};
export const closeModalAction = () => ({
  type: CLOSE_MODAL
});

export const openConvosPanel = () => ({
  type: OPEN_CONVOS_PANEL
});

export const openDirectMessagesPanel = () => ({
  type: OPEN_DIRECT_MESSAGES_PANEL
});

export const closePanel = () => ({
  type: CLOSE_PANEL
});

// reducers
const initialModalState = {
  createRoom: false,
  signIn: false
};

export const modalIsOpen = (state = initialModalState, action) => {
  switch (action.type) {
    case OPEN_CREATE_ROOM_MODAL:
      return {
        createRoom: true,
        signIn: false
      };
    case OPEN_SIGN_IN_MODAL:
      return {
        createRoom: false,
        signIn: true
      };
    case CLOSE_MODAL:
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
    case OPEN_CONVOS_PANEL:
      return {
        open: true,
        title: 'All Conversations',
        inner: 'Conversations'
      };
    case OPEN_DIRECT_MESSAGES_PANEL:
      return {
        open: true,
        title: 'Direct Messages',
        inner: 'DirectMessages'
      };
    case CLOSE_PANEL:
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

export const addTypingUserHelper = (usersTyping, action) => {
  return usersTyping.indexOf(action.payload.username) >= 0
    ? usersTyping
    : usersTyping.concat(action.payload.username);
};

export const removeTypingUserHelper = (usersTyping, action) =>
  usersTyping.filter((username) => username !== action.payload.username);

export const usersTyping = (state = [], action) => {
  switch (action.type) {
    case ADD_TYPING_USER:
      return addTypingUserHelper(state, action);
    case REMOVE_TYPING_USER:
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
