import React from 'react';
import moment from 'moment';

const Message = ({ username, text, createdAt }) => {
  const dateString = moment(createdAt).format('MMM MM HH:mm');
  return (
    <article className="chat-item">
      <div className="chat-item-container">
        <div className="chat-item-content">
          <div className="chat-item-details">
            <div className="chat-item-user">{username}</div>
            <div className="chat-item-time">{dateString}</div>
          </div>
          <div className="chat-item-text">{text}</div>
        </div>
      </div>
    </article>
  );
};

export default Message;
