import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signIn } from '../actions/';

export const Welcome = ({ dispatch }) => {
  let input;
  return (
    <div>
      <Link to="/chat">Chat</Link>
      <h1>Welcome!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(signIn(input.value));
          input.value = '';
        }}
      >
        <input
          placeholder="Enter username"
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(Welcome);
