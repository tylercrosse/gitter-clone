import React,
  { PropTypes }        from 'react';
import { connect }     from 'react-redux';
import { withRouter }  from 'react-router';
import { fetchMessages,
  addMessage }         from '../../actions/';
import messagesByConvo from '../../selectors/messagesByConvo';
import ChatHeader      from './ChatHeader.jsx';
import ChatToolbar     from './ChatToolbar.jsx';
import ChatContent     from './ChatContent.jsx';
import ChatInput       from './ChatInput.jsx';
import                      './chatmain.scss';

export class ChatMain extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.convoName !== prevProps.convoName) {
      this.fetchData();
    }
  }
  fetchData() {
    const convo = this.props.routeParams.convo;
    this.props.fetchMessages(convo);
  }
  render() {
    return (
      <main className="chat-header-wrapper">
        <ChatHeader user={this.props.user} />
        <div className="chat-and-toolbar-wrapper">
          <ChatToolbar />
          <div className="chat-wrapper">
            <ChatContent
            containerId="chat-content"
            messages={this.props.messages}
            />
            <ChatInput
            {...this.props}
            onMessageSubmit={this.props.addMessage}
            />
          </div>
        </div>
      </main>
    );
  }
}

ChatMain.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  convoName: PropTypes.string.isRequired
};

export const mapStateToProps = (state, props) => {
  const convoName = props.routeParams.convo;
  const messages = state.convos[convoName] ?
    messagesByConvo(state, convoName) :
    [];
  return {
    messages,
    user: state.user,
    convos: state.convos,
    convoName
  };
};

export default withRouter(connect(
  mapStateToProps,
  { fetchMessages, addMessage }
)(ChatMain));
