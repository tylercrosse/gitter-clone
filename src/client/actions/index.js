import { v4 } from 'node-uuid';
import { push } from 'react-router-redux';
import { CALL_API, Schemas } from '../middleware/api';

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

export const fetchMessages = () => ({
  [CALL_API]: {
    types: [MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_FAILURE],
    endpoint: 'messages',
    schema: Schemas.MESSAGE_ARRAY
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
