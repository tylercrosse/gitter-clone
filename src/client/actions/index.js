import { push } from 'react-router-redux';

let nextMessageId = 0;

export const addMessage = ({ text, username }) => ({
  type: 'server.ADD_MESSAGE',
  id: nextMessageId++,
  username,
  text
});

export const signIn = (username) => (dispatch) => {
  dispatch({
    type: 'SIGN_IN',
    username,
  });
  dispatch(push('/chat'));
};
