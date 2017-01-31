import React from 'react';
import { connect } from 'react-redux';

export const App = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
