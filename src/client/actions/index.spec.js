import * as actions from './index';

describe('message actions', () => {
  it('addMessage should create ADD_MESSAGE action', () => {
    expect(actions.addMessage('Use Redux'))
      .toEqual({
        type: 'server.ADD_MESSAGE',
        id: 0,
        text: 'Use Redux'
      });
  });
});
