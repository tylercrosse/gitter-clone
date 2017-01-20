import React from 'react';
import { connect } from 'react-redux';
import Message from './Message.jsx';

export const MessageList = ({ messages }) => (
  <ul>
    {messages.map((message) =>
      <Message
        key={message.id}
        {...message}
      />
    )}
  </ul>
);

const mapStateToProps = (state) => ({
  messages: state.messages
});

export default connect(
  mapStateToProps
)(MessageList);
