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
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hz-chal');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('==> 🛢 MongoDB connected!');
});

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

app.use(express.static(path.join(__dirname, '../..', 'static')));

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
