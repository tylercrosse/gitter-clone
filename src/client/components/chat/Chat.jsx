import React,
  { PropTypes }    from 'react';
import { connect } from 'react-redux';
import { fetchMessages,
  addMessage }     from '../../actions/';
import ChatMenu    from '../chatmenu/ChatMenu.jsx';
import ChatHeader  from './ChatHeader.jsx';
import ChatToolbar from './ChatToolbar.jsx';
import ChatContent from './ChatContent.jsx';
import ChatInput   from './ChatInput.jsx';
import                  './chat.scss';

export class Chat extends React.Component {
  componentDidMount() {
    const convo = this.props.routeParams.convo;
    this.props.fetchMessages(convo);
  }
  render() {
    return (
      <div className="chat-container">
        <ChatMenu />
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
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  convos: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => ({
  messages: state.messages,
  user: state.user,
  convos: state.convos
});

export default connect(
  mapStateToProps,
  { fetchMessages, addMessage }
)(Chat);
