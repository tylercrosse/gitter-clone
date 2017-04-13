import shortid       from 'shortid';
import { normalize } from 'normalizr';
import { push }      from 'react-router-redux';
import { CALL_API,
  getJSON }          from 'redux-api-middleware';
import Schemas       from './schemas';

const API_ROOT = window.location.origin + '/api/';

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
    endpoint: API_ROOT + 'messages/' + convo,
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
    endpoint: API_ROOT + 'convos',
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

export const SIGN_IN = 'SIGN_IN';
export const signIn = (username, id) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
    id: id || shortid.generate(),
    username,
  });
  dispatch(push('/chat'));
};

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
