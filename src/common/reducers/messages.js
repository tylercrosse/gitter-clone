import * as ActionTypes from '../actions';

export const message = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
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
    case ActionTypes.ADD_MESSAGE: {
      return {
        ...state,
        ...message(undefined, action)
      };
    }
    case ActionTypes.SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default messages;
