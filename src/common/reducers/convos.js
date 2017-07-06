import { normalize } from 'normalizr';
import { push }      from 'react-router-redux';
import { CALL_API,
  getJSON }          from 'redux-api-middleware';
import Schemas       from './schemas';
import { SIGN_IN_SUCCESS, SIGN_OUT } from './user';

// actions
export const CREATE_DIRECT_MESSAGE_REQUEST = 'CREATE_DIRECT_MESSAGE_REQUEST';
export const CREATE_DIRECT_MESSAGE_SUCCESS = 'CREATE_DIRECT_MESSAGE_SUCCESS';
export const CREATE_DIRECT_MESSAGE_FAILURE = 'CREATE_DIRECT_MESSAGE_FAILURE';

export const CREATE_CONVO_REQUEST = 'CREATE_CONVO_REQUEST';
export const CREATE_CONVO_SUCCESS = 'CREATE_CONVO_SUCCESS';
export const CREATE_CONVO_FAILURE = 'CREATE_CONVO_FAILURE';

export const CONVOS_REQUEST = 'CONVOS_REQUEST';
export const CONVOS_SUCCESS = 'CONVOS_SUCCESS';
export const CONVOS_FAILURE = 'CONVOS_FAILURE';

// action creators


// const API_ROOT = 'http://127.0.0.1:3333/api/';
// FIXME XXX this will break on deployment
// Need to implement a more robust method of getting host
// that also works on the server
// const API_ROOT = window.location.origin + '/api/';

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

// reducers
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
    case CREATE_CONVO_SUCCESS:
      return {
        [action.payload.name]: {
          ...action.payload
        }
      };
    case CREATE_DIRECT_MESSAGE_SUCCESS:
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
    case CREATE_CONVO_SUCCESS: {
      return {
        ...state,
        ...convo(undefined, action)
      };
    }
    case CREATE_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        ...convo(undefined, action)
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...signInConvos(action)
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default convos;
