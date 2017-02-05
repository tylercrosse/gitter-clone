import { v4 } from 'node-uuid';
import { push } from 'react-router-redux';
import { normalize, schema } from 'normalizr';
import { CALL_API, getJSON } from 'redux-api-middleware';

const API_ROOT = window.location.origin + '/api/';
let nextMessageId = 0;

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = ({ text, username }) => ({
  type: 'server.' + ADD_MESSAGE,
  id: nextMessageId++,
  username,
  text
});

export const MESSAGES_REQUEST = 'MESSAGES_REQUEST';
export const MESSAGES_SUCCESS = 'MESSAGES_SUCCESS';
export const MESSAGES_FAILURE = 'MESSAGES_FAILURE';

const messageSchema = new schema.Entity('messages', {}, {
  idAttribute: 'createdAt'
});

const Schemas = {
  MESSAGE: messageSchema,
  MESSAGE_ARRAY: [messageSchema]
};

export const fetchMessages = () => ({
  [CALL_API]: {
    endpoint: API_ROOT + 'messages',
    method: 'GET',
    types: [
      MESSAGES_REQUEST,
      {
        type: MESSAGES_SUCCESS,
        /* istanbul ignore next: boilerplate from redux-api-middleware */
        payload: (action, state, res) => {
        /* istanbul ignore next */
          return getJSON(res)
            .then((json) => normalize(json, Schemas.MESSAGE_ARRAY));
        }
      },
      MESSAGES_FAILURE
    ]
  }
});

export const SIGN_IN = 'SIGN_IN';

export const signIn = (username, id) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
    id: id || v4(),
    username,
  });
  dispatch(push('/chat'));
};
