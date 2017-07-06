import React from 'react';
import PropTypes from 'prop-types';

const Chat = ({ menu, main }) => (
  <div className="chat-container">
    {menu}
    {main}
  </div>
);

Chat.propTypes = {
  menu: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
};

export default Chat;
