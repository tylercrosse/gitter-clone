import React from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import * as actions from '../../actions/';

export const Chat = (props) => {
  const form = props.user.loggedIn ? (
    <MessageForm />
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

const mapStateToProps = (state) => ({
  messages: state.messages,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
