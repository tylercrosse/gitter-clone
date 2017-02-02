import moment from 'moment';
import { ADD_MESSAGE } from '../actions';

const burstify = (messages) => {
  const msgA = Object.values(messages);
  const bursts = {};
  let prev = msgA[0];
  prev.burstStart = true;
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
      curr.burstStart = false;
      bursts[prev.username + ':' + prev.createdAt].push(curr);
    } else {
      curr.burstStart = true;
      bursts[curr.username + ':' + curr.createdAt] = [curr];
      prev = curr;
    }
  }
  return Object.values(bursts).reduce((acc, cur) => acc.concat(cur));
};

const message = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        [action.message._id]: {
          ...action.message
        }
      };
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  if (action.payload && action.payload.entities) {
    const burstifiedMessages = burstify(action.payload.entities.messages);
    return {
      ...state,
      ...burstifiedMessages
    };
  }
  switch (action.type) {
    case ADD_MESSAGE: {
      const burstifiedMessages = burstify({
        ...state,
        ...message(undefined, action)
      });
      return {
        ...state,
        ...burstifiedMessages
      };
    }
    default:
      return state;
  }
};

export default messages;
