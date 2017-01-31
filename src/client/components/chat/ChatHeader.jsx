import React from 'react';
import { Link } from 'react-router';

export const ChatHeader = ({ user }) => {
  const nav = user.loggedIn ? (
    <img
      className="avatar"
      src={'http://i.pravatar.cc/30?u=' + user.username} alt={user.username}
    />
  ) : (
    <Link to="/">Log In</Link>
  );
  return (
    <header className="chat-header">
      <Link to="/chat">Chat</Link>
      {nav}
    </header>
  );
};

export default ChatHeader;
