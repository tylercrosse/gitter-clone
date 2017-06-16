import React from 'react';
import _uniqBy from 'lodash/uniqBy';

export const ChatToolbar = ({ messages, user }) => {
  const currentUser = user.name ? [{...user}] : [];
  const allUsers = messages
    .map((message) => message.User)
    .concat(currentUser);
  const uniqueUsers = _uniqBy(allUsers, 'id');
  const avatars = uniqueUsers
    .map((user) => (
      <li className="avatar" key={user.id}>
        <img
        src={'http://i.pravatar.cc/30?u=' + user.name} alt={user.name}
        />
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
