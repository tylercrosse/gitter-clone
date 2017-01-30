import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => (
  <section className="chat-content">
    {Object.values(messages).map((message) =>
      <Message
        key={message._id}
        {...message}
      />
    )}
  </section>
);

export default MessageList;
