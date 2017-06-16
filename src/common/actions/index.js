// import shortid       from 'shortid';
import { normalize } from 'normalizr';
import { CALL_API,
  getJSON }          from 'redux-api-middleware';
import Schemas       from './schemas';

// const API_ROOT = 'http://127.0.0.1:3333/api/';
// FIXME XXX this will break on deployment
// Need to implement a more robust method of getting host
// that also works on the server
// const API_ROOT = window.location.origin + '/api/';

export const ADD_TYPING_USER = 'ADD_TYPING_USER';
export const addTypingUser = ({ username }) => ({
  type: 'server.' + ADD_TYPING_USER,
  payload: {
    username
  }
});

export const REMOVE_TYPING_USER = 'REMOVE_TYPING_USER';
export const removeTypingUser = ({ username }) => ({
  type: 'server.' + REMOVE_TYPING_USER,
  payload: {
    username
  }
});

let nextMessageId = 0;
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = ({
  username,
  text,
  rawMarkup,
  convo
}) => ({
  type: 'server.' + ADD_MESSAGE,
  id: nextMessageId++,
  username,
  text,
  rawMarkup,
  convo
});

export const MESSAGES_REQUEST = 'MESSAGES_REQUEST';
export const MESSAGES_SUCCESS = 'MESSAGES_SUCCESS';
export const MESSAGES_FAILURE = 'MESSAGES_FAILURE';
export const fetchMessages =  (convo) => ({
  [CALL_API]: {
    endpoint: window.location.origin + '/api/messages/' + convo,
    method: 'GET',
    types: [
      MESSAGES_REQUEST,
      {
        type: MESSAGES_SUCCESS,
        payload: /* istanbul ignore next */ (action, state, res) => {
          return getJSON(res)
          .then((json) => normalize(json, Schemas.MESSAGE_ARRAY));
        }
      },
      MESSAGES_FAILURE
    ]
  }
});

export const ADD_CONVO = 'ADD_CONVO';
export const addConvo = ({ name }) => ({
  type: 'server.' + ADD_CONVO,
  name
});

export const CONVOS_REQUEST = 'CONVOS_REQUEST';
export const CONVOS_SUCCESS = 'CONVOS_SUCCESS';
export const CONVOS_FAILURE = 'CONVOS_FAILURE';
export const fetchConvos = () => ({
  [CALL_API]: {
    endpoint: window.location.origin + '/api/convos',
    method: 'GET',
    types: [
      CONVOS_REQUEST,
      {
        type: CONVOS_SUCCESS,
        payload: /* istanbul ignore next */ (action, state, res) => {
          return getJSON(res)
            .then((json) => normalize(json, Schemas.CONVO_ARRAY));
        }
      },
      CONVOS_FAILURE
    ]
  }
});

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
// FIXME change to something my expressive like 'postSignIn'
export const signIn = (username) => ({
  [CALL_API]: {
    endpoint: window.location.origin + '/api/signIn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
    types: [
      SIGN_IN_REQUEST,
      {
        type: SIGN_IN_SUCCESS,
        payload: /* istanbul ignore next */ (action, state, res) => getJSON(res)
      },
      SIGN_IN_FAILURE
    ]
  }
});

export const OPEN_CREATE_ROOM_MODAL = 'OPEN_CREATE_ROOM_MODAL';
export const openCreateRoomModal = () => ({
  type: OPEN_CREATE_ROOM_MODAL
});

export const OPEN_SIGN_IN_MODAL = 'OPEN_SIGN_IN_MODAL';
export const openSignInModal = () => ({
  type: OPEN_SIGN_IN_MODAL
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({
  type: CLOSE_MODAL
});
