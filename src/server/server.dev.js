import path from 'path';
import express    from 'express';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose';
import Promise    from 'bluebird';
import SocketIo   from 'socket.io';
import socketActions from './controllers/sockets';
import routes        from './config/routes';

const app = express();
const port = process.env.PORT || 3333;

// db config
mongoose.Promose = Promise;
mongoose.connect('mongodb://localhost/gitter-clone');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('==> 🛢 MongoDB connected!');
});

// webpack middleware
if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddlewareInstance = require('./config/devConfig.js').webpackDevMiddlewareInstance;
  const webpackHotMiddlewareInstance = require('./config/devConfig.js').webpackHotMiddlewareInstance;

  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddlewareInstance);
}

// other middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../..', 'static')));
app.use('/', routes);

export const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  let host = server.address().address;
  if (host === '::') {
    host = '127.0.0.1';
  }
  console.log('==> 🌎 Listening at http://%s:%s', host, port);
});

// socket.io config
export const io = new SocketIo(server);
socketActions(io);

export default app;
