import React    from 'react';
import { Link } from 'react-router';
import               './errors.scss';

const Generic404 = () => (
  <div className="generic404">
    <h1>404</h1>
    <p>This is not the chat you are looking for,</p>
    <Link to="/explore">try exploring existing chats.</Link>
    <p>Or create a new chat</p>
  </div>
);

export default Generic404;
