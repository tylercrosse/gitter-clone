import React from 'react';
import { Link } from 'react-router';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

const Chat = () => (
  <div>
    <Link to="/">Welcome</Link>
    <MessageList />
    <MessageForm />
  </div>
);

export default Chat;
