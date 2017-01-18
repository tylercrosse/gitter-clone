'use strict';

import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config.dev';

const app = express();
const port = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.status(200).end(renderFullPage());
})

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});


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
  `
}