import _ from 'lodash';
import shortid from 'shortid';
import logger from '../config/logger';

const Convo = require('../models').Convo;
const User = require('../models').User;

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
  const errHandler = /* istanbul ignore next */ (err) => {
    logger.error(err);
  };

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

export const findOrCreateDirectMessage = async (io, action) => {
  const errHandler = /* istanbul ignore next */ (err) => {
    logger.error(err);
  };

  // find relevant users, their conversations, & the users of those conversations
  const creator = await User.findOne({
    where: { id: action.payload.creatorId },
    include: {
      model: Convo,
      as: 'convos',
      attributes: ['id', 'name'],
      include: {
        model: User,
        as: 'users',
        attributes: ['id', 'name']
      }
    }
  }).catch(errHandler);
  creator.ConvoMembership = { visible: true };

  const targets = await User.findAll({
    where: { id: action.payload.targetIds },
    include: {
      model: Convo,
      as: 'convos',
      attributes: ['id', 'name'],
      include: {
        model: User,
        as: 'users',
        attributes: ['id', 'name']
      }
    }
  }).catch(errHandler);

  const userInstances = [creator, ...targets];
  const userIds = [action.payload.creatorId]
    .concat(action.payload.targetIds)
    .sort();
  const existingConvoId = findExistingConvo(userInstances, userIds);
  let directConvoId;

  if (!existingConvoId) {
    // create convo
    const name = shortid.generate();
    const directConvo = await Convo.create({
      name,
      direct: true
    })
      .then(async (convo) => {
        // associate the users
        await convo.setUsers(userInstances);
        return convo;
      })
      .catch(errHandler);

    // set the id
    directConvoId = directConvo.id;
  } else {
    directConvoId = existingConvoId;
  }

  // find & send the new convo (needed for include)
  Convo.find({
    where: { id: directConvoId },
    include: [
      {
        model: User,
        as: 'users'
      }
    ]
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

/**
 * Searches for any conversations that already exist between the given users.
 * If one is found returns the id of that convo, otherwise returns false.
 * @param  {[type]} instances an Array of User Instances with included convos & users of those convos
 * @param  {[type]} ids       an Array of userIds
 * @return {[type]}           an id of matching convo || false
 */
function findExistingConvo(instances, ids) {
  // build object of arrays of userIds keyed by convoIds
  const convos = {};
  instances.forEach((userInstance) => {
    userInstance.convos.forEach((convoInstance) => {
      const convo = [];
      convoInstance.users.forEach((user) => {
        convo.push(user.id);
      });
      convos[convoInstance.id] = convo.sort(); // destructive, but ok assuming total knowledge of convo.users
    });
  });
  // compare arrays of userIds
  for (const convoId in convos) {
    if (_.isEqual(convos[convoId], ids)) return convoId;
  }
  return false;
}
