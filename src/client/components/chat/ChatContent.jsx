import React from 'react';
import ChatItem from './ChatItem.jsx';

const ChatContent = ({ messages }) => (
  <section className="chat-content scroller">
    {Object.values(messages).map((message) =>
      <ChatItem
        key={message._id}
        {...message}
      />
    )}
  </section>
);

export default ChatContent;
