import React from 'react';
import MessageList from './chat/MessageList.jsx';
import MessageForm from './chat/MessageForm.jsx';

export default function() {
  return (
    <div>
      <MessageList />
      <MessageForm />
    </div>
  );
}
