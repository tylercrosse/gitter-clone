import Convo from '../models/Convo';
import * as convosCtlr from './convos';

describe('convos controller', () => {
  it('should get convos', () => {
    const req = { params: { } };
    const res = {
      json: jest.fn()
    };
    Convo.find = jest.fn().mockReturnThis();
    Convo.then = jest.fn((callback) => callback('dummy convo'));
    convosCtlr.getConvos(req, res);
    expect(Convo.find).toHaveBeenCalledTimes(1);
    expect(Convo.then).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith('dummy convo');
  });

  it('should add convos', () => {
    const io = {
      emit: jest.fn()
    };
    const action = {
      name: 'chat'
    };
    Convo.create = jest.fn().mockReturnThis();
    Convo.then = jest.fn((callback) => callback('dummy convo'));
    convosCtlr.addConvo(io, action);
    expect(Convo.create).toHaveBeenCalledTimes(1);
    expect(Convo.then).toHaveBeenCalledTimes(1);
    expect(io.emit)
      .toHaveBeenCalledWith('action', {convo: 'dummy convo', type: 'ADD_CONVO'});
  });
});
