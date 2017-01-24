import { ADD_MESSAGE } from '../actions';

const message = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        [action.message._id]: {
          ...action.message
        }
      };
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  if (action.response && action.response.entities.messages) {
    return {
      ...state,
      ...action.response.entities.messages
    };
  }
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        ...message(undefined, action)
      };
    default:
      return state;
  }
};

export default messages;
