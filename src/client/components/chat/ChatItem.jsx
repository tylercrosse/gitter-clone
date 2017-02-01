import React from 'react';
import moment from 'moment';

export const ChatItem = ({ username, text, createdAt, burstStart }) => {
  const dateString = moment(createdAt).format('MMM MM HH:mm');
  if (burstStart) {
    return (
      <article className="chat-item burst-start">
        <div className="chat-item-container">
          <div className="chat-item-aside">
            <img
              className="avatar"
              src={'http://i.pravatar.cc/30?u=' + username} alt={username}
            />
          </div>
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
  }
  return (
    <article className="chat-item burst-continued">
      <div className="chat-item-container">
        <div className="chat-item-content">
          <div className="chat-item-text">{text}</div>
        </div>
      </div>
    </article>
  );
};

export default ChatItem;
