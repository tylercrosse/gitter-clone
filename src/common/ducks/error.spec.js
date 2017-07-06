import error from './error';

const setup = (actionOverride) => {
  const action = Object.assign({
    payload: {
      name: 'ApiError',
      status: 404
    }
  }, actionOverride);
  const initialState = {
    messages: false,
    convos: false,
    signIn: false
  };

  return {
    action,
    initialState
  };
};

describe('error reducer', () => {
  it('should handle initial state', () => {
    const { initialState } = setup();
    expect(
      error(undefined, {})
    ).toEqual(initialState);
  });

  describe('404 ApiError', () => {
    it('should add error to state on MESSAGES_FAILURE', () => {
      const { action } = setup({type: 'MESSAGES_FAILURE'});
      expect(error({}, action)).toMatchSnapshot();
    });
    it('should add error to state on CONVOS_FAILURE', () => {
      const { action } = setup({type: 'CONVOS_FAILURE'});
      expect(error({}, action)).toMatchSnapshot();
    });
    it('should add error to state on SIGN_IN_FAILURE', () => {
      const { action } = setup({type: 'SIGN_IN_FAILURE'});
      expect(error({}, action)).toMatchSnapshot();
    });
    it('should return state for default switch case', () => {
      const { action } = setup();
      expect(error({}, action)).toMatchSnapshot();
    });
  });

  describe('SUCCESS', () => {
    it('should reset messages error on MESSAGES_SUCCESS', () => {
      const { action } = setup({type: 'MESSAGES_FAILURE'});
      const state = error({}, action);
      expect(state).toMatchSnapshot();
      const newAction = {type: 'MESSAGES_SUCCESS'};
      expect(error(state, newAction)).toMatchSnapshot();
    });
    it('should reset convos error on CONVOS_SUCCESS', () => {
      const { action } = setup({type: 'CONVOS_FAILURE'});
      const state = error({}, action);
      expect(state).toMatchSnapshot();
      const newAction = {type: 'CONVOS_SUCCESS'};
      expect(error(state, newAction)).toMatchSnapshot();
    });
    it('should reset signIn error on SIGN_IN_SUCCESS', () => {
      const { action } = setup({type: 'SIGN_IN_FAILURE'});
      const state = error({}, action);
      expect(state).toMatchSnapshot();
      const newAction = {type: 'SIGN_IN_SUCCESS'};
      expect(error(state, newAction)).toMatchSnapshot();
    });
  });
});
