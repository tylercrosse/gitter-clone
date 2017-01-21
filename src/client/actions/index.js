// import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

let nextMessageId = 0;

export const addMessage = (text) => ({
  type: 'server.ADD_MESSAGE',
  id: nextMessageId++,
  text
});

// export const checkAuth = () => {
//   if (cookie.load('username')) return true;
//   return false;
// };

export const signIn = (username) => (dispatch) => {
  // cookie.save('username', username);
  dispatch({
    type: 'SIGN_IN',
    username,
  });
  browserHistory.push('/chat');
};
