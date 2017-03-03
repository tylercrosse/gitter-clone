const path              = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const CleanPlugin       = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config            = require('./webpack.config.base');

module.exports = merge(config, {
  devtool: 'cheap-module-source-map',
  entry: ['./src/client/index'],
  plugins: [
    new CleanPlugin(['./static/dist'], {verbose: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new ExtractTextPlugin('style.min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.css?$/,
        loaders: ['style-loader', 'raw-loader']
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  }
});
