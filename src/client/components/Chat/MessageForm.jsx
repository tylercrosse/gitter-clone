import React from 'react';

class MessageForm extends React.Component {
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
    this.props.onMessageSubmit(this.state.draft);
    this.setState({
      draft: ''
    });
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => this.updateDraft(e)}
          value={this.state.draft}
          placeholder="Click here to type a chat message."
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default MessageForm;
