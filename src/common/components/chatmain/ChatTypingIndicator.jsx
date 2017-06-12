import React from 'react';

const ChatTypingIndicator = ({ isTyping }) => (
  <div>
    {isTyping} is typing
  </div>
);

ChatTypingIndicator.propTypes = {
  isTyping: React.PropTypes.string.isRequired
};

export default ChatTypingIndicator;
