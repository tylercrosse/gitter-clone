const path    = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, './static/dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      // minChunks: function minChunks(module) {
      //   return module.context && module.context.indexOf('node_modules') !== -1;
      // }
    })
  ]
};
