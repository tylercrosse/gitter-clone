module.exports = {
  stirpPrefix: '/static/dist/',
  // replacePrefix: '/dist/',
  staticFileGlobs: [
    'static/dist/manifest.json',
    'static/dist/**.js',
    'static/dist/**.min.css',
  ],
  swFilePath: 'static/dist/serviceWorker.js'
};
