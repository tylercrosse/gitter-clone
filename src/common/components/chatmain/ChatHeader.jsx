/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export const ChatHeader = ({ signOut, user, pathname }) => {
  const userInfo = user.loggedIn && (
    <div className="chat-user-avatar" >
      <img
      onClick={() => signOut()}
      className="avatar"
      src={'http://i.pravatar.cc/30?u=' + user.name} alt={user.name}
      />
    </div>
  );
  return (
    <header className="chat-header">
      <div className="chat-header-avatar">
        <img
          src={'http://i.pravatar.cc/32?u=' + pathname} alt={pathname}
        />
      </div>
      <Link
        className="chat-header-title"
        to={'/' + pathname}
      >
        {pathname}
      </Link>
      {userInfo}
    </header>
  );
};

ChatHeader.propTypes = {
  user: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default ChatHeader;
