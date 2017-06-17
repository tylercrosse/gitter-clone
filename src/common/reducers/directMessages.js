import * as ActionTypes from '../actions/';

export const directMessage = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DIRECT_MESSAGE:
      return {
        [action.convo.name]: {
          ...action.convo
        }
      };
    default:
      return state;
  }
};

const directMessages = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DIRECT_MESSAGE:
      return {
        ...state,
        ...directMessage(undefined, action)
      };
    default:
      return state;
  }
};

export default directMessages;
