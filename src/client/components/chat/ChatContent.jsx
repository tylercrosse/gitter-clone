import React, { PropTypes } from 'react';
import { animateScroll } from 'react-scroll';
import ChatItem from './ChatItem.jsx';

class ChatContent extends React.Component {
  componentDidUpdate() {
    animateScroll.scrollToBottom({containerId: 'chat-content'});
  }
  render() {
    return (
      <section
        id="chat-content"
        className="chat-content scroller"
      >
        {Object.values(this.props.messages).map((message) =>
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
  messages: PropTypes.object.isRequired
};

export default ChatContent;
