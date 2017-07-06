import { push }      from 'react-router-redux';
import { CALL_API,
  getJSON }          from 'redux-api-middleware';

// actions
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

// action creators
export const signOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
  dispatch(push('/'));
};

// FIXME change to something my expressive like 'postSignIn'
export const signIn = (username) => ({
  [CALL_API]: {
    endpoint: window.location.origin + '/api/signIn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
    types: [
      SIGN_IN_REQUEST,
      {
        type: SIGN_IN_SUCCESS,
        payload: /* istanbul ignore next */ (action, state, res) => getJSON(res)
      },
      SIGN_IN_FAILURE
    ]
  }
});

// reducers
const initialState = {
  loggedIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loggedIn: true
      };
    case SIGN_OUT:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
};

export default user;
