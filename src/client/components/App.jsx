import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const App = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
