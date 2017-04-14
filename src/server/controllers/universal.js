export const renderFullPage = (req, res) => { // eslint-disable-line import/prefer-default-export
  // res.sendfile() ?? https://expressjs.com/en/api.html#res.sendFile
  res.status(200).end(
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <meta name="theme-color" content="#753a88">
    <title>Gitter Clone</title>
    <link href="/css/style.min.css" rel="stylesheet">
    <link href="/manifest.json" rel="manifest">
  </head>
  <body>
    <div id="root"></div>
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
</html>`);
};

// <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet">
