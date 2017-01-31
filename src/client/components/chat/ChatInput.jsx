import React    from 'react';
import { Link } from 'react-router';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: ''
    };
  }
  updateDraft(e) {
    this.setState({
      draft: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onMessageSubmit({
      text: this.state.draft,
      username: this.props.user.username
    });
    this.setState({
      draft: ''
    });
  }
  render() {
    const chatAuth = this.props.user.loggedIn ? (
      <div className="chat-input-container">
        <div className="chat-input-avatar">
          <img
            className="avatar"
            src={'http://i.pravatar.cc/30?u=' + this.props.user.username} alt={this.props.user.username}
          />
        </div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <textarea
            onChange={(e) => this.updateDraft(e)}
            value={this.state.draft}
            placeholder="Click here to type a chat message."
            name="chat"
            type="text"
            autoFocus
            autoComplete="off"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    ) : (
      <div className="chat-input-container">
        <Link className="chat-input-btn" to="/">Sign in to start talking</Link>
      </div>
    );
    return (
      <footer className="chat-input">
        {chatAuth}
      </footer>
    );
  }
}

export default ChatInput;
