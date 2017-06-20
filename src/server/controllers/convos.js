import logger from '../config/logger';

const Convo = require('../models').Convo;
const User = require('../models').User;

const errHandler = /* istanbul ignore next */ (err) => {
  logger.error(err);
};

export const getConvos = (req, res) => {
  Convo.findAll()
    .then((convos) => {
      res.json(convos);
    })
    .catch(
      /* istanbul ignore next */ (err) => {
        logger.log('error', err);
        res.status(500).send('Something went wrong!');
      }
    );
};

export const addConvo = (io, action) => {
  Convo.create({ name: action.name, direct: false })
    .then((convo) => {
      io.emit('action', {
        // FIXME better decouple db & socket interactions
        type: 'ADD_CONVO',
        convo
      });
    })
    .catch(errHandler);
};

export const addDirectMessage = async (io, action) => {
  // find relevant users
  const creator = await User.findOne({
    where: { id: action.payload.creatorId }
  }).catch(errHandler);
  creator.ConvoMembership = { visible: true };

  const targets = await User.findAll({
    where: { id: action.payload.targetIds }
  }).catch(errHandler);

  // create convo
  await Convo.create({
    name: action.payload.name,
    direct: true
  })
    .then((convo) => {
      // associate the users
      return convo.setUsers([creator, ...targets]);
    })
    .catch(errHandler);

  // find & send the new convo (needed for include)
  Convo.find({
    where: {name: action.payload.name},
    include: [{
      model: User,
      as: 'users'
    }]
  })
    .then((convo) => {
      io.emit('action', {
        // FIXME better decouple db & socket interactions
        type: 'ADD_DIRECT_MESSAGE',
        convo
      });
      return convo;
    })
    .catch(errHandler);
};
