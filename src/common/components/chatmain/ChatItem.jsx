import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from '../Avatar';

export const ChatItem = ({
  User,
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
            <Avatar user={User} />
          </div>
          <div className="chat-item-content">
            <div className="chat-item-details">
              <div className="chat-item-user">{User.name}</div>
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
  User: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  rawMarkup: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  burstStart: PropTypes.bool.isRequired,
};

export default ChatItem;
