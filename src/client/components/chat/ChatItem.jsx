import React from 'react';
import moment from 'moment';

class ChatItem extends React.Component {
  checkBursts() {
    //
    console.log(this);
  }
  render() {
    const { username, text, createdAt } = this.props;
    const dateString = moment(createdAt).format('MMM MM HH:mm');
    return (
      <article className="chat-item">
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
}

export default ChatItem;
