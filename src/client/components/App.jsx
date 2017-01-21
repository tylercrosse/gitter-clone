import React from 'react';
import { connect } from 'react-redux';

export const App = ({ children, user }) => {
  const nav = user.loggedIn ? (
    user.username
  ) : (
    'log in'
  );
  return (
    <div>
      <p>{nav}</p>
      {children}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
