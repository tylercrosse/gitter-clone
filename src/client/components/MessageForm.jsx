import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/';

let MessageForm = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={(node) => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addMessage(input.value));
          input.value = '';
        }}
      > Submit</button>
    </div>
  );
};

export default MessageForm = connect()(MessageForm);
