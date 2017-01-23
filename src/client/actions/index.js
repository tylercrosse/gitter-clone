import { push } from 'react-router-redux';

let nextMessageId = 0;

export const addMessage = (text) => ({
  type: 'server.ADD_MESSAGE',
  id: nextMessageId++,
  text
});

export const signIn = (username) => (dispatch) => {
  dispatch({
    type: 'SIGN_IN',
    username,
  });
  dispatch(push('/chat'));
};
