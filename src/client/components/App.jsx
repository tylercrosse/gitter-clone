import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export const App = ({ children, user }) => {
  const nav = user.loggedIn ? (
    user.username
  ) : (
    'log in'
  );
  return (
    <div>
      <Link to="/">Welcome</Link>
      <p>{nav}</p>
      {children}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
