import { SIGN_IN } from '../actions';

const initialState = {
  loggedIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        username: action.username,
        loggedIn: true
      };
    case 'SIGN_OUT':
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

export default user;
