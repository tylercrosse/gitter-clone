import * as types from '../actions/';
import callApi, { CALL_API, Schemas } from './api';

const createFakeStore = (fakeData) => ({
  getState() {
    return fakeData;
  }
});

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null;
  const dispatch = callApi(createFakeStore(storeData))((actionAttempt) => dispatched = actionAttempt);
  dispatch(action);
  return dispatched;
};

describe('api middleware', () => {
  it('should dispatch if store is empty', () => {
    const action = {
      [CALL_API]: {
        types: [types.MESSAGES_REQUEST, types.MESSAGES_SUCCESS, types.MESSAGES_FAILURE],
        endpoint: 'messages',
        schema: Schemas.MESSAGE_ARRAY
      }
    };

    const result = {type: 'MESSAGES_REQUEST'};

    expect(
      dispatchWithStoreOf({}, action)
    ).toEqual(result);
  });

  it.skip('should not dispatch if store already has type', () => {
    const action = {
      [CALL_API]: {
        types: [types.MESSAGES_REQUEST, types.MESSAGES_SUCCESS, types.MESSAGES_FAILURE],
        endpoint: 'messages',
        schema: Schemas.MESSAGE_ARRAY
      }
    };

    expect(
      dispatchWithStoreOf({
        [types.MESSAGES_REQUEST]: 'dispatched'
      }, action)
    ).toBeUndefined();
  });
});

// export const fetchMessages = () => ({
//   [CALL_API]: {
//     types: [MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_FAILURE],
//     endpoint: 'messages',
//     schema: Schemas.MESSAGE_ARRAY
//   }
// });
