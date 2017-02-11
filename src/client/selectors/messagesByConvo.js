import _ from 'lodash';
import { createSelector } from 'reselect';

const getMessages = (state) => (state.messages);
const getConvoMessageIds = (state, convoName) => (state.convos[convoName].messages);

const getMessagesByConvo = (messages, convoMessageIds) => (
  _.filter(messages, (message) => (
    _.includes(convoMessageIds, message._id)
  ))
);

export default createSelector(
  [getMessages, getConvoMessageIds],
  getMessagesByConvo
);
