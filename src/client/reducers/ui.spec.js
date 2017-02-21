import ui, { modalIsOpen, isFetching } from './ui';

// const setup = (overrides) => {
//   const initialState = Object.assign({
//     modalIsOpen: false
//   }, overrides);
//
//   return {
//     initialState
//   };
// };

describe('ui reducer', () => {
  it('should handle initial state', () => {
    expect(
      ui(undefined, {})
    ).toMatchSnapshot();
  });

  describe('modalIsOpen', () => {
    it('should handle OPEN_MODAL', () => {
      const initialState = false;
      expect(
        modalIsOpen(initialState, {
          type: 'OPEN_MODAL',
        })
      ).toEqual(true);
    });

    it('should handle CLOSE_MODAL', () => {
      const state = true;
      expect(
        modalIsOpen(state, {
          type: 'CLOSE_MODAL',
        })
      ).toEqual(false);
    });
  });

  describe('isFetching', () => {
    it('should handle MESSAGES_REQUEST', () => {
      const initialState = false;
      expect(
        isFetching(initialState, {
          type: 'MESSAGES_REQUEST',
        })
      ).toEqual(true);
    });

    it('should handle MESSAGES_SUCCESS', () => {
      const state = true;
      expect(
        isFetching(state, {
          type: 'MESSAGES_SUCCESS',
        })
      ).toEqual(false);
    });

    it('should handle MESSAGES_FAILURE', () => {
      const state = true;
      expect(
        isFetching(state, {
          type: 'MESSAGES_FAILURE',
        })
      ).toEqual(false);
    });
  });
});
