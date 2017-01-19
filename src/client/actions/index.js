let nextMessageId = 0;

export const addMessage = text => ({
  type: 'server.ADD_MESSAGE',
  id: nextMessageId++,
  text
});
