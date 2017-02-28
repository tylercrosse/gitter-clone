import error from './error';

const setup = () => {
  const initialState = false;

  return {
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

  it('should handle SIGN_IN', () => {
    const { initialState } = setup();
    expect(
      error(initialState, {
        error: true
      })
    ).toEqual(true);
  });
});
