import React from 'react';
import { connect } from 'react-redux';

const Message = ({ id, text }) => (
  <li>
    {id}: {text}
  </li>
);

let Conversation = ({ messages }) => (
  <ul>
    {messages.map(message =>
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

export default Conversation = connect(
  mapStateToProps
)(Conversation);
