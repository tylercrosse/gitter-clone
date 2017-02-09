import Convo from '../models/Convo';

export const getConvos = (req, res) => {
  // TODO error handling, bad request
  Convo.find({}).then((convos) => {
    // console.log('⏺ convos: ', convos);
    res.json(convos);
  }); // TODO error handling, db errors
};

export const addConvo = (io, action) => {
  // console.log('🏡', action);
  Convo.create({
    name: action.name
  }).then((convo) => {
    io.emit('action', { // FIXME better decouple db & socket interactions
      type: 'ADD_CONVO',
      convo
    });
  }); // TODO error handling, db errors
};
