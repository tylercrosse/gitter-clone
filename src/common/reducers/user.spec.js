import user from './user';

const setup = () => {
  const initialState = {
    loggedIn: false
  };

  return {
    initialState
  };
};

describe('user reducer', () => {
  it('should handle initial state', () => {
    const { initialState } = setup();
    expect(
      user(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle SIGN_IN', () => {
    const { initialState } = setup();
    expect(
      user(initialState, {
        type: 'SIGN_IN',
        username: 'bill'
      })
    ).toEqual({
      username: 'bill',
      loggedIn: true
    });
  });
});
