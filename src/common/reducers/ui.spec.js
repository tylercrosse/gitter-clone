import ui, {
  modalIsOpen,
  isFetching,
  usersTyping,
} from './ui';

describe('ui reducer', () => {
  it('should handle initial state', () => {
    expect(ui(undefined, {})).toMatchSnapshot();
  });

  describe('modalIsOpen', () => {
    it('should handle OPEN_CREATE_ROOM_MODAL', () => {
      const initialState = false;
      expect(
        modalIsOpen(initialState, {
          type: 'OPEN_CREATE_ROOM_MODAL'
        })
      ).toMatchSnapshot();
    });

    it('should handle OPEN_SIGN_IN_MODAL', () => {
      const initialState = false;
      expect(
        modalIsOpen(initialState, {
          type: 'OPEN_SIGN_IN_MODAL'
        })
      ).toMatchSnapshot();
    });

    it('should handle CLOSE_MODAL', () => {
      const state = true;
      expect(
        modalIsOpen(state, {
          type: 'CLOSE_MODAL'
        })
      ).toMatchSnapshot();
    });
  });

  describe('isFetching', () => {
    it('should handle MESSAGES_REQUEST', () => {
      const initialState = false;
      expect(
        isFetching(initialState, {
          type: 'MESSAGES_REQUEST'
        })
      ).toEqual(true);
    });

    it('should handle MESSAGES_SUCCESS', () => {
      const state = true;
      expect(
        isFetching(state, {
          type: 'MESSAGES_SUCCESS'
        })
      ).toEqual(false);
    });

    it('should handle MESSAGES_FAILURE', () => {
      const state = true;
      expect(
        isFetching(state, {
          type: 'MESSAGES_FAILURE'
        })
      ).toEqual(false);
    });
  });

  describe('usersTyping', () => {
    it('should handle ADD_TYPING_USER', () => {
      expect(
        usersTyping(undefined, {
          type: 'ADD_TYPING_USER',
          payload: { username: 'Dan' }
        })
      ).toEqual(['Dan']);
      expect(
        usersTyping(['Dan'], {
          type: 'ADD_TYPING_USER',
          payload: { username: 'Dan' }
        })
      ).toEqual(['Dan']);
    });

    it('should handle REMOVE_TYPING_USER', () => {
      expect(
        usersTyping(undefined, {
          type: 'REMOVE_TYPING_USER',
          payload: { username: 'Dan' }
        })
      ).toEqual([]);
      expect(
        usersTyping(['Dan'], {
          type: 'REMOVE_TYPING_USER',
          payload: { username: 'Dan' }
        })
      ).toEqual([]);
      expect(
        usersTyping(['Dan', 'Liz'], {
          type: 'REMOVE_TYPING_USER',
          payload: { username: 'Dan' }
        })
      ).toEqual(['Liz']);
    });
  });
});
