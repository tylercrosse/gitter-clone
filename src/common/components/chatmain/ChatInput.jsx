import React, { PropTypes } from 'react';
import debounce from 'lodash/debounce';

const DEBOUNCE_TIME = 3000;
const TIME_CUSHION = 200;

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // NOTE the debounce time for addTypingUser needs to be slightly less to avoid race condition-esque situation with the server socket responses in the wrong order
    this.addTypingUser = debounce(
      this.props.addTypingUser,
      DEBOUNCE_TIME - TIME_CUSHION,
      { leading: true }
    );
    this.removeTypingUser = debounce(this.props.removeTypingUser, DEBOUNCE_TIME);
  }
  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.nativeEvent.shiftKey) {
      this.handleSubmit(e);
    }
  }
  handleChange(e) {
    this.setState({
      draft: e.target.value
    });
    this.addTypingUser({
      username: this.props.user.name
    });
    this.removeTypingUser({
      username: this.props.user.name
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.draft.trim()) return;
    const convo = this.props.routeParams.convo;
    this.props.onMessageSubmit({
      userId: this.props.user.id,
      text: this.state.draft,
      convo
    });
    this.props.removeTypingUser({
      username: this.props.user.name
    });
    this.setState({
      draft: ''
    });
  }
  render() {
    let inputContent;
    if (this.props.user.loggedIn) {
      inputContent = (
        <div className="chat-input-container">
          <div className="chat-input-avatar">
            <img
              className="avatar"
              src={'http://i.pravatar.cc/30?u=' + this.props.user.name}
              alt={this.props.user.name}
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <textarea
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              value={this.state.draft}
              placeholder="Click here to type a chat message. Supports Github flavoured markdown."
              name="chat"
              type="text"
              autoFocus
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      );
    } else {
      inputContent = (
        <div className="chat-input-container">
          <button
            onClick={this.props.openSignInModal}
            className="chat-input-btn"
          >
            Sign in to start talking
          </button>
        </div>
      );
    }
    return (
      <footer className="chat-input">
        {inputContent}
      </footer>
    );
  }
}

ChatInput.propTypes = {
  addTypingUser: PropTypes.func.isRequired,
  removeTypingUser: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired
};

export default ChatInput;
