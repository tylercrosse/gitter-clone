// import fs from 'fs';
import express from 'express';
import * as apiCtlr from '../controllers/api';

const router = express.Router();

function renderFullPage(req, res) {
  // res.sendfile() ?? https://expressjs.com/en/api.html#res.sendFile
  res.status(200).end(
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <title>Gitter Clone</title>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    <link href="/dist/style.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>`);
}

router.get('/api/messages', apiCtlr.getMessages);
router.get('/index.html', renderFullPage);
router.get('/*', renderFullPage);

export default router;
