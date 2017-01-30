import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/';
import                 './welcome.scss';

export const Welcome = ({ dispatch }) => {
  let input;
  return (
    <div className="welcome">
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
