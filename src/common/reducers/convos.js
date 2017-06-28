import * as ActionTypes from '../actions';

export const signInConvos = (action) => {
  const obj = {};
  action.payload.convos.forEach((convoObj) => {
    obj[convoObj.name] = {
      ...convoObj
    };
  });
  return obj;
};

export const convo = (state, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_CONVO_SUCCESS:
      return {
        [action.payload.name]: {
          ...action.payload
        }
      };
    case ActionTypes.CREATE_DIRECT_MESSAGE_SUCCESS:
      return {
        [action.payload.name]: {
          ...action.payload
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
    case ActionTypes.CREATE_CONVO_SUCCESS: {
      return {
        ...state,
        ...convo(undefined, action)
      };
    }
    case ActionTypes.CREATE_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        ...convo(undefined, action)
      };
    case ActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        ...signInConvos(action)
      };
    default:
      return state;
  }
};

export default convos;
