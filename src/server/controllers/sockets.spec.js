import { socketActions } from './sockets';
import * as messageCtlr from './messages';

describe('sockets controller', () => {
  it('should handle server.ADD_MESSAGE', () => {
    const action = {
      type: 'server.ADD_MESSAGE',
      id: 0,
      username: 'josh',
      text: 'hey'
    };
    messageCtlr.addMessage = jest.fn();
    socketActions({}, action);
    expect(messageCtlr.addMessage)
      .toHaveBeenCalledWith({}, action);
  });

  it('should handle unknown actions', () => {
    const action = {type: 'FooBar'};
    const foobarAction = () => { socketActions({}, action); };
    expect(foobarAction)
      .toThrow('Unknown action');
  });
});
