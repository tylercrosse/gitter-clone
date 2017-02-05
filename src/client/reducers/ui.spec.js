import ui from './ui';

const setup = (overrides) => {
  const initialState = Object.assign({
    modalIsOpen: false
  }, overrides);

  return {
    initialState
  };
};

describe('ui reducer', () => {
  it('should handle initial state', () => {
    const { initialState } = setup();
    expect(
      ui(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle OPEN_MODAL', () => {
    const { initialState } = setup();
    expect(
      ui(initialState, {
        type: 'OPEN_MODAL',
      })
    ).toEqual({
      modalIsOpen: true
    });
  });

  it('should handle CLOSE_MODAL', () => {
    const { initialState } = setup({modalIsOpen: true});
    expect(
      ui(initialState, {
        type: 'CLOSE_MODAL',
      })
    ).toEqual({
      modalIsOpen: false
    });
  });
});
