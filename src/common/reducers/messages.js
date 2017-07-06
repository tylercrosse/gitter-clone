import { normalize } from 'normalizr';
import { CALL_API,
  getJSON }          from 'redux-api-middleware';
import Schemas       from './schemas';
import { SIGN_OUT } from './user';

// actions
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const MESSAGES_REQUEST = 'MESSAGES_REQUEST';
export const MESSAGES_SUCCESS = 'MESSAGES_SUCCESS';
export const MESSAGES_FAILURE = 'MESSAGES_FAILURE';

// action creators
export const addMessage = ({
  userId,
  text,
  rawMarkup,
  convo
}) => ({
  type: 'server.' + ADD_MESSAGE,
  userId,
  text,
  rawMarkup,
  convo
});

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


// reducers
export const message = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        [action.message.createdAt]: {
          ...action.message
        }
      };
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  if (action.payload && action.payload.entities && action.payload.entities.messages) {
    return {
      ...state,
      ...action.payload.entities.messages
    };
  }
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        ...message(undefined, action)
      };
    }
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default messages;
