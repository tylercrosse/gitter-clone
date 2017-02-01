import moment from 'moment';

const burstify = (messages) => {
  const msgA = Object.values(messages);
  const bursts = {};
  let prev = msgA[0];
  bursts[prev.username + ':' + prev.createdAt] = [prev];
  for (let i = 1; i < msgA.length; i++) {
    const curr = msgA[i];
    const currTime = moment(curr.createdAt);
    const prevTime = moment(prev.createdAt);
    const rangeEnd = prevTime.clone().add(15, 'minutes');
    if (
      prev.username === curr.username &&
      currTime.isBetween(prevTime, rangeEnd, null, '[]')
    ) {
      bursts[prev.username + ':' + prev.createdAt].push(curr);
    } else {
      bursts[curr.username + ':' + curr.createdAt] = [curr];
      prev = curr;
    }
  }
  return bursts;
};

export default burstify;
