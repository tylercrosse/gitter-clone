import React from 'react';
import { connect }            from 'react-redux';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import { fetchMessages, addMessage } from '../../actions/';

export class Chat extends React.Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    const form = this.props.user.loggedIn ? (
      <MessageForm
        user={this.props.user}
        onMessageSubmit={this.props.addMessage}
      />
    ) : (
      'please log in to chat'
    );
    return (
      <div>
        <MessageList messages={this.props.messages} />
        {form}
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
