import user from './user';

const setup = () => {
  const initialState = {
    loggedIn: false
  };

  const payload = {
    name: 'Dan',
    id: '123145'
  };

  return {
    initialState,
    payload
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
    const { initialState, payload } = setup();
    expect(
      user(initialState, {
        type: 'SIGN_IN',
        payload
      })
    ).toMatchSnapshot();
  });
});
