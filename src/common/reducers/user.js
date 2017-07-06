import { SIGN_IN_SUCCESS } from '../actions';

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
    case 'SIGN_OUT':
      return {
        loggedIn: false
      };
    default:
      return state;
  }
};

export default user;
