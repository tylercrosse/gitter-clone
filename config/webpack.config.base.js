const path    = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, './static/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
