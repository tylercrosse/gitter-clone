import React from 'react';
import { animateScroll } from 'react-scroll';
import ChatItem from './ChatItem.jsx';

class ChatContent extends React.Component {
  componentDidUpdate() {
    animateScroll.scrollToBottom({containerId: 'chat-content'});
  }
  renderItems() {
    const vals = Object.values(this.props.bursts);
    if (vals.length > 0) {
      return vals
        .reduce((acc, cur) => acc.concat(cur))
        .map((message) => (
          <ChatItem
            key={message._id}
            {...message}
          />
        ));
    }
    return '';
  }
  render() {
    return (
      <section
        id="chat-content"
        className="chat-content scroller"
      >
        {this.renderItems()}
      </section>
    );
  }
}

export default ChatContent;
