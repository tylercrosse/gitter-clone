import React from 'react';
import PropTypes from 'prop-types';
import _uniqBy from 'lodash/uniqBy';
import Avatar from '../Avatar';

export const ChatToolbar = ({ messages, user }) => {
  const currentUser = user.name ? [{...user}] : [];
  const allUsers = messages
    .map((message) => message.User)
    .concat(currentUser);
  const uniqueUsers = _uniqBy(allUsers, 'id');
  const avatars = uniqueUsers
    .map((singleUser) => (
      <li className="avatar" key={singleUser.id}>
        <Avatar user={singleUser} />
        {/* <div className="status" /> */}
      </li>
    ));
  return (
    <aside className="chat-toolbar">
      <ul className="roster">
        {avatars}
      </ul>
    </aside>
  );
};

ChatToolbar.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default ChatToolbar;
