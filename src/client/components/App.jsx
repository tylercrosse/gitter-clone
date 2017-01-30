import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import                  './header.scss';

export const App = ({ children, user }) => {
  const nav = user.loggedIn ? (
    user.username
  ) : (
    <Link to="/">Log In</Link>
  );
  return (
    <div>
      <header className="chat-header">
        <Link to="/chat">Chat</Link>
        {nav}
      </header>
      {children}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
