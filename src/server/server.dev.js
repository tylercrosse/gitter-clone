import express    from 'express';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose';
import Promise    from 'bluebird';
import SocketIo   from 'socket.io';
import webpack    from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';
import socketActions from './controllers/sockets';
import routes        from './config/routes';

const app = express();
const port = process.env.PORT || 3333;

// db config
mongoose.Promose = Promise;
// if(process.env.NODE_ENV == "production"){
//   mongoose.connect(process.env.MONGOLAB_URL);
// }else{
mongoose.connect('mongodb://localhost/gitter-clone');
// }

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('==> 🛢 MongoDB connected!');
});

// webpack middleware
const compiler = webpack(webpackConfig);
const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddleware(compiler));

// other middleware
app.use(bodyParser.json());
app.use('/', routes);

function renderFullPage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Gitter Clone</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
}

app.get('/*', (req, res) => {
  res.status(200).end(renderFullPage());
});

const server = app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

const io = new SocketIo(server);
socketActions(io);
