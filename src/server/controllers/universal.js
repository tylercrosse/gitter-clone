import React              from 'react';
import { renderToString } from 'react-dom/server';
import { Provider }       from 'react-redux';
import { match,
  RouterContext }         from 'react-router';
import logger             from '../config/logger';
import { routes }         from '../../common/routes';
import configureStore     from '../../common/store/configureStore';

function getReactString(req, res, store) {
  return new Promise((resolve, reject) => {
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        reject();
      } else if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } else if (props) {
        resolve(
          renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          )
        );
      } else {
        reject();
      }
    });
  });
}

function renderFullPage(html, preloadedState) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <meta name="theme-color" content="#753a88">
    <title>Gitter Clone</title>
    <link href="/manifest.json" rel="manifest">
    <link href="/css/style.min.css" rel="stylesheet">
    <link href="/font/SourceSansPro-Light.ttf" rel="stylesheet" type="application/x-font-ttf">
    <link href="/font/SourceSansPro-Regular.ttf" rel="stylesheet" type="application/x-font-ttf">
    <link href="/font/SourceSansPro-Semibold.ttf" rel="stylesheet" type="application/x-font-ttf">
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
    </script>
    <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/app.js"></script>
    <script type="text/javascript">
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/js/serviceWorker.js');
        });
      }
    </script>
  </body>
</html>`;
}

async function universalCtlr(req, res) {
  try {
    // const apiResult = await fetchCounter();
    // const params = qs.parse(req.query)
    // const counter = parseInt(params.counter, 10) || apiResult || 0
    // const preloadedState = { counter }
    // logger.debug('req.query:', qs.parse(req.query));
    const preloadedState = {};
    const store = configureStore(preloadedState);
    const ReactString = await getReactString(req, res, store);
    const finalState = store.getState();
    res.send(renderFullPage(ReactString, finalState));
  } catch (err) {
    logger.error(err);
    res.send('Error');
  }
}

export default universalCtlr;
