import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './user';
import { MESSAGES_SUCCESS, MESSAGES_FAILURE } from './messages';
import * as ActionTypes from '../actions';

const initialState = {
  messages: false,
  convos: false,
  signIn: false,
};

const error = (state = initialState, action) => {
  if (action.payload && action.payload.name === 'ApiError') {
    // not currently necessary to limit to 404s
    // if (action.payload.status === 404) {
    switch (action.type) {
      case MESSAGES_FAILURE: {
        return {
          ...state,
          messages: action.payload
        };
      }
      case ActionTypes.CONVOS_FAILURE: {
        return {
          ...state,
          convos: action.payload
        };
      }
      case SIGN_IN_FAILURE: {
        return {
          ...state,
          singIn: action.payload
        };
      }
      default: {
        return state;
      }
    }
    // }
  }
  switch (action.type) {
    case MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: false
      };
    }
    case ActionTypes.CONVOS_SUCCESS: {
      return {
        ...state,
        convos: false
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        signIn: false
      };
    }
    default: {
      return state;
    }
  }
};

export default error;
