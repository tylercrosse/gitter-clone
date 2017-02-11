import messagesByConvo from './messagesByConvo';

const setup = (overrides) => (
  Object.assign({
    messages: {
      1: {text: 'one'},
      2: {text: 'two'},
      3: {text: 'three'}
    },
    convos: {
      foo: {
        name: 'foo',
        messages: [1, 3]
      },
      bar: {
        name: 'bar',
        messages: [2]
      }
    }
  }, overrides));

describe('messagesByConvo selector', () => {
  it('should select desired messages from state', () => {
    const convoName = 'foo';
    expect(messagesByConvo(setup(), convoName))
      .toMatchSnapshot();
  });
});
