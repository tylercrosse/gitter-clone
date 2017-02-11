import { ADD_CONVO } from '../actions';

export const convo = (state, action) => {
  switch (action.type) {
    case ADD_CONVO:
      return {
        [action.convo.name]: {
          ...action.convo
        }
      };
    default:
      return state;
  }
};

const convos = (state = {}, action) => {
  if (action.payload && action.payload.entities && action.payload.entities.convos) {
    return {
      ...state,
      ...action.payload.entities.convos
    };
  }
  switch (action.type) {
    case ADD_CONVO: {
      return {
        ...state,
        ...convo(undefined, action)
      };
    }
    default:
      return state;
  }
};

export default convos;
