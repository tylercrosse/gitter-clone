import React from 'react';

const Message = ({ username, text }) => (
  <li>
    {username}: {text}
  </li>
);

export default Message;
