import React,
  { PropTypes }  from 'react';

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
    const convo = this.props.routeParams.convo;
    this.props.onMessageSubmit({
      username: this.props.user.username,
      text: this.state.draft,
      convo
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
          placeholder="Click here to type a chat message. Supports Github flavoured markdown."
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
        <button
        onClick={this.props.openSignInModal}
        className="chat-input-btn"
        >
          Sign in to start talking
        </button>
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
  user: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired
};

export default ChatInput;
