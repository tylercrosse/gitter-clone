import React,
  { PropTypes }  from 'react';
import debounce from 'lodash/debounce';

const DEBOUNCE_TIME = 4000;

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startTyping = debounce(this.props.startTyping, DEBOUNCE_TIME, {leading: true});
    this.stopTyping = debounce(this.props.stopTyping, DEBOUNCE_TIME);
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
    this.startTyping({
      username: this.props.user.username
    });
    this.stopTyping({
      username: this.props.user.username
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.draft.trim()) return;
    const convo = this.props.routeParams.convo;
    this.props.onMessageSubmit({
      username: this.props.user.username,
      text: this.state.draft,
      convo
    });
    this.props.stopTyping({
      username: this.props.user.username
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
            src={'http://i.pravatar.cc/30?u=' + this.props.user.username} alt={this.props.user.username}
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
  startTyping: PropTypes.func.isRequired,
  stopTyping: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired
};

export default ChatInput;
