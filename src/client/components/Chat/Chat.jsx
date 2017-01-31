import React       from 'react';
import { Link }    from 'react-router';
import { connect } from 'react-redux';
import { fetchMessages, addMessage } from '../../actions/';
import ChatMenu    from './ChatMenu.jsx';
import ChatHeader  from './ChatHeader.jsx';
import ChatToolbar from './ChatToolbar.jsx';
import ChatContent from './ChatContent.jsx';
import ChatInput   from './ChatInput.jsx';
import                  './chat.scss';

export class Chat extends React.Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    const form = this.props.user.loggedIn ? (
      <ChatInput
        user={this.props.user}
        onMessageSubmit={this.props.addMessage}
      />
    ) : (
      <div className="chat-input">
        <Link to="/">Sign In</Link>
      </div>
    );
    return (
      <div className="chat-container">
        <ChatMenu />
        <main className="chat-header-wrapper">
          <ChatHeader user={this.props.user} />
          <div className="chat-and-toolbar-wrapper">
            <ChatToolbar />
            <div className="chat-wrapper">
              <ChatContent messages={this.props.messages} />
              {form}
            </div>
          </div>
        </main>
      </div>
    );
  }
}


export const mapStateToProps = (state) => ({
  messages: state.messages,
  user: state.user
});

export default connect(
  mapStateToProps,
  { fetchMessages, addMessage }
)(Chat);
