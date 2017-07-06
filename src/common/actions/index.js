import { normalize } from 'normalizr';
import { push }      from 'react-router-redux';
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

export const CREATE_DIRECT_MESSAGE_REQUEST = 'CREATE_DIRECT_MESSAGE_REQUEST';
export const CREATE_DIRECT_MESSAGE_SUCCESS = 'CREATE_DIRECT_MESSAGE_SUCCESS';
export const CREATE_DIRECT_MESSAGE_FAILURE = 'CREATE_DIRECT_MESSAGE_FAILURE';
export const findOrCreateDirectMessage = ({ creatorId, targetIds }) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: window.location.origin + '/api/convos/direct',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorId, targetIds }),
      types: [
        CREATE_DIRECT_MESSAGE_REQUEST,
        {
          type: CREATE_DIRECT_MESSAGE_SUCCESS,
          payload: /* istanbul ignore next */ (action, state, res) => (
            res.json().then((json) => {
              dispatch(push('/' + json.name));
              return json;
            })
          )
        },
        CREATE_DIRECT_MESSAGE_FAILURE
      ]
    }
  });
};

export const CREATE_CONVO_REQUEST = 'CREATE_CONVO_REQUEST';
export const CREATE_CONVO_SUCCESS = 'CREATE_CONVO_SUCCESS';
export const CREATE_CONVO_FAILURE = 'CREATE_CONVO_FAILURE';
export const createConvo = ({ name }) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: window.location.origin + '/api/convos',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
      types: [
        CREATE_CONVO_REQUEST,
        {
          type: CREATE_CONVO_SUCCESS,
          payload: /* istanbul ignore next */ (action, state, res) => (
            res.json().then((json) => {
              dispatch(push('/' + json.name));
              return json;
            })
          )
        },
        CREATE_CONVO_FAILURE
      ]
    }
  });
};

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

export const OPEN_CREATE_ROOM_MODAL = 'OPEN_CREATE_ROOM_MODAL';
export const openCreateRoomModal = () => ({
  type: OPEN_CREATE_ROOM_MODAL
});

export const OPEN_SIGN_IN_MODAL = 'OPEN_SIGN_IN_MODAL';
export const openSignInModal = () => ({
  type: OPEN_SIGN_IN_MODAL
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => (dispatch) => {
  dispatch(closeModalAction());
  dispatch(closePanel());
};
export const closeModalAction = () => ({
  type: CLOSE_MODAL
});

export const OPEN_CONVOS_PANEL = 'OPEN_CONVOS_PANEL';
export const openConvosPanel = () => ({
  type: OPEN_CONVOS_PANEL
});

export const OPEN_DIRECT_MESSAGES_PANEL = 'OPEN_DIRECT_MESSAGES_PANEL';
export const openDirectMessagesPanel = () => ({
  type: OPEN_DIRECT_MESSAGES_PANEL
});

export const CLOSE_PANEL = 'CLOSE_PANEL';
export const closePanel = () => ({
  type: CLOSE_PANEL
});
