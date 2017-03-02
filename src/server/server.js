import path           from 'path';
import express        from 'express';
import bodyParser     from 'body-parser';
import mongoose       from 'mongoose';
import Promise        from 'bluebird';
import SocketIo       from 'socket.io';
import expressWinston from 'express-winston';
import logger, {
  errLogger,
  reqLogger }         from './config/logger';
import socketCtlr     from './controllers/sockets';
import router         from './config/routes';

const app = express();
const port = process.env.PORT || 3333;

// db config
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/gitter-clone');

mongoose.connection.on('error', logger.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  logger.log('info', '==> 🛢 MongoDB connected!');
});

/* istanbul ignore next: webpack middleware for dev */
if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddlewareInstance = require('./config/devConfig.js').webpackDevMiddlewareInstance;
  const webpackHotMiddlewareInstance = require('./config/devConfig.js').webpackHotMiddlewareInstance;

  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddlewareInstance);
}

// other middleware
app.use(bodyParser.json());
app.use(expressWinston.logger({
  winstonInstance: reqLogger
}));
app.use('/', express.static(path.join(__dirname, '../..', 'static')));
app.use('/', router);
app.use(expressWinston.errorLogger({
  winstonInstance: errLogger
}));

export const server = app.listen(port, (err) => {
  /* istanbul ignore next: obvious when fails, hard to test */
  if (err) {
    logger.log('error', err);
  }
  let host = server.address().address;
  /* istanbul ignore next: very hard to test */
  if (host === '::') {
    host = '127.0.0.1';
  }
  logger.log('info', '==> 🌎 Listening at http://%s:%s', host, port);
});

// socket.io config
export const io = new SocketIo(server);
socketCtlr(io);

export default app;
