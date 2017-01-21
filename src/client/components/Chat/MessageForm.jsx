import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/';

export const MessageForm = ({ dispatch }) => {
  let input;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addMessage(input.value));
        input.value = '';
      }}
    >
      <input
        ref={(node) => {
          input = node;
        }}
      />
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default connect()(MessageForm);
