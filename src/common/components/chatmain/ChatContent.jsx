import React, { PropTypes } from 'react';
import { animateScroll } from 'react-scroll';
import ChatItem from './ChatItem.jsx';

class ChatContent extends React.Component {
  componentDidUpdate() {
    animateScroll.scrollToBottom({containerId: 'chat-content'});
  }
  render() {
    const { messages } = this.props;
    return (
      <section
      id="chat-content"
      className="chat-content scroller"
      >
        {messages.length > 0 && messages.map((message) =>
          <ChatItem
          key={message._id}
          {...message}
          />
        )}
      </section>
    );
  }
}

ChatContent.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatContent;
