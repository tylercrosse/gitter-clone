import React from 'react';
import PropTypes from 'prop-types';

const ChatTypingIndicator = ({ usersTyping }) => {
  let indicatorMessage;
  if (usersTyping.length === 1) {
    indicatorMessage = usersTyping[0] + ' is typing';
  } else if (usersTyping.length <= 3) {
    indicatorMessage = usersTyping.join(' and ') + ' are typing';
  } else {
    indicatorMessage = usersTyping.length + ' users are typing';
  }
  return (
    <div>
      {indicatorMessage}
    </div>
  );
};

ChatTypingIndicator.propTypes = {
  usersTyping: PropTypes.array.isRequired
};

export default ChatTypingIndicator;
