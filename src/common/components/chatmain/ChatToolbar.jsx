import React from 'react';
import _uniqBy from 'lodash/uniqBy';
import Avatar from '../Avatar';

export const ChatToolbar = ({ messages, user }) => {
  const currentUser = user.name ? [{...user}] : [];
  const allUsers = messages
    .map((message) => message.User)
    .concat(currentUser);
  const uniqueUsers = _uniqBy(allUsers, 'id');
  const avatars = uniqueUsers
    .map((user) => (
      <li className="avatar" key={user.id}>
        <Avatar user={user} />
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

export default ChatToolbar;
