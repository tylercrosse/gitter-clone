import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => (
  <ul>
    {Object.values(messages).map((message) =>
      <Message
        key={message._id}
        {...message}
      />
    )}
  </ul>
);

export default MessageList;
