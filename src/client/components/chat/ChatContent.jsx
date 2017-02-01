import React from 'react';
import { animateScroll } from 'react-scroll';
import burstify from '../../reducers/burst';
import ChatItem from './ChatItem.jsx';

class ChatContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bursts: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      bursts: burstify(nextProps)
    });
  }
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

export default ChatContent;
