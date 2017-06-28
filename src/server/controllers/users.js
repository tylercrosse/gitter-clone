import logger from '../config/logger';

const User = require('../models').User;
const Convo = require('../models').Convo;

export const signIn = (req, res) => {
  User.findOrCreate({
    where: { name: req.body.username },
    include: [
      {
        model: Convo,
        as: 'convos',
        include: {
          model: User,
          as: 'users',
        }
      }
    ]
  })
    .spread((user, created) => {
      if (created) logger.info('user created: ', user.name);
      if (user === null) res.status(500).send('Something went wrong!');
      else res.json(user);
    })
    .catch(
      /* istanbul ignore next */ (err) => {
        logger.log('error', err);
        res.status(500).send('Something went wrong!');
      }
    );
};
