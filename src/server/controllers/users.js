import logger from '../config/logger';

const User = require('../models').User;

export const signIn = (req, res) => {
  User.findOrCreate({ where: { name: req.body.username }})
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
