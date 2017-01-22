import React from 'react';
import { connect }            from 'react-redux';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import * as actions from '../../actions/';

export const Chat = (props) => {
  const form = props.user.loggedIn ? (
    <MessageForm
      onMessageSubmit={props.actions.addMessage}
    />
  ) : (
    'please log in to chat'
  );
  return (
    <div>
      <MessageList messages={props.messages} />
      {form}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  messages: state.messages,
  user: state.user
});

export default connect(
  mapStateToProps,
  actions
)(Chat);
