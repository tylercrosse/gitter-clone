import React from 'react';
import { Link } from 'react-router';

const Welcome = () => (
  <div>
    <Link to="/chat">Chat</Link>
    <h1>Welcome!</h1>
  </div>
);

export default Welcome;
