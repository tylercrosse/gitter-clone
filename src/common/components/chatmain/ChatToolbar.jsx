import React from 'react';

export const ChatToolbar = ({ messages, user }) => {
  const currentUser = user.username ? [{...user}] : [];
  const users = messages
    .concat(currentUser)
    .map((message) => message.username)
    .filter((username, i, arr) => arr.indexOf(username) === i)
    .map((username) => (
      <li className="avatar" key={username}>
        <img

        src={'http://i.pravatar.cc/30?u=' + username} alt={username}
        />
        {/* <div className="status" /> */}
      </li>
    ));
  return (
    <aside className="chat-toolbar">
      <ul className="roster">
        {users}
      </ul>
    </aside>
  );
};

export default ChatToolbar;
