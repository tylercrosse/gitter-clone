import Convo from '../models/Convo';
import * as convosCtlr from './convos';

xdescribe('convos controller', () => {
  beforeEach(() => {
    Convo.find = jest.fn().mockReturnThis();
    Convo.create = jest.fn().mockReturnThis();
    Convo.then = jest.fn(function cb(callback) {
      callback('dummy convo');
      return this;
    });
    Convo.catch = jest.fn().mockReturnThis();
  });

  it('should get convos', () => {
    const req = { params: { } };
    const res = {
      json: jest.fn()
    };
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
    convosCtlr.addConvo(io, action);
    expect(Convo.create).toHaveBeenCalledTimes(1);
    expect(Convo.then).toHaveBeenCalledTimes(1);
    expect(io.emit)
      .toHaveBeenCalledWith('action', {convo: 'dummy convo', type: 'ADD_CONVO'});
  });
});
