import React from 'react';
import moment from 'moment';

const Message = ({ username, text, createdAt }) => {
  const dateString = moment(createdAt).format('MMM MM HH:mm');
  return (
    <li>
      <p>{username}: {dateString}</p>
      <p>{text}</p>
    </li>
  );
};

export default Message;
