import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import Prism from 'prismjs';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: ''
    };
  }
  componentDidMount() {
    marked.setOptions({
      sanitize: true,
      highlight: (code, language) => (
        Prism.highlight(code, Prism.languages[language])
      )
    });
  }
  updateDraft(e) {
    this.setState({
      draft: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const rawMarkup = marked(this.state.draft);
    this.props.onMessageSubmit({
      username: this.props.user.username,
      text: this.state.draft,
      rawMarkup
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

ChatInput.propTypes = {
  onMessageSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default ChatInput;
