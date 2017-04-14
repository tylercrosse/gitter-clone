import React, { PropTypes } from 'react';
import moment from 'moment';

export const ChatItem = ({
  username,
  text,
  rawMarkup,
  createdAt,
  burstStart
}) => {
  const dateString = moment(createdAt).format('MMM DD HH:mm');
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
            {rawMarkup ?
              <div
              className="chat-item-text"
              dangerouslySetInnerHTML={{__html: rawMarkup}}
              /> :
              <div className="chat-item-text">{text}</div>
            }
          </div>
        </div>
      </article>
    );
  }
  return (
    <article className="chat-item burst-continued">
      <div className="chat-item-container">
        <div className="chat-item-content">
          {rawMarkup ?
            <div
            className="chat-item-text"
            dangerouslySetInnerHTML={{__html: rawMarkup}}
            /> :
            <div className="chat-item-text">{text}</div>
          }
        </div>
      </div>
    </article>
  );
};

ChatItem.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  burstStart: PropTypes.bool.isRequired,
};

export default ChatItem;
