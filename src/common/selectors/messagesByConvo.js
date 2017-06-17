import _filter from 'lodash/filter';
import moment from 'moment';
import { createSelector } from 'reselect';

export const getMessages = (state) => (state.messages);
export const getConvoId = (state, convoName) => (state.convos[convoName].id);

export const getMessagesByConvoId = (messages, convoId) => (
  _filter(messages, (message) => (
    message.convoId === convoId
  )));

export const getMessagesByConvoIdSelector = createSelector(
  [getMessages, getConvoId],
  getMessagesByConvoId
);

const makeGetMessagesByConvoId = () => (
  createSelector(
    getMessagesByConvoIdSelector,
    burstify
  )
);

export default makeGetMessagesByConvoId;

/**
 * Groups sequential messages within 15 minutes by the same user.
 * Grouping is done by adding burstStart property to messages.
 * @param  {Array} messages from current chat sorted by time
 * @return {Array}          same as input + burstStart property
 */
export const burstify = (msgA) => {
  if (msgA.length === 0) return msgA;
  const bursts = {};
  let prev = msgA[0];
  prev.burstStart = true;
  bursts[prev.User.name + ':' + prev.createdAt] = [prev];
  for (let i = 1; i < msgA.length; i++) {
    const curr = msgA[i];
    const currTime = moment(curr.createdAt);
    const prevTime = moment(prev.createdAt);
    const BURST_LENGTH = 15;
    const rangeEnd = prevTime.clone().add(BURST_LENGTH, 'minutes');
    if (
      prev.User.name === curr.User.name &&
      currTime.isBetween(prevTime, rangeEnd, null, '[]')
    ) {
      curr.burstStart = false;
      bursts[prev.User.name + ':' + prev.createdAt].push(curr);
    } else {
      curr.burstStart = true;
      bursts[curr.User.name + ':' + curr.createdAt] = [curr];
      prev = curr;
    }
  }
  const flat = Object.values(bursts).reduce((acc, cur) => acc.concat(cur));
  return flat;
};
