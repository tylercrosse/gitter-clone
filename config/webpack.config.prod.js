const path              = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const CleanPlugin       = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config            = require('./webpack.config.base');

module.exports = merge(config, {
  devtool: 'cheap-module-source-map',
  entry: {
    application: ['./src/client/index'],
    vendor: [
      'moment',
      'normalizr',
      'react',
      'react-dom',
      'react-modal',
      'react-router',
      'react-scroll',
      'react-redux',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'redux-api-middleware',
      'redux-socket.io',
      'reselect',
      'socket.io-client',
    ]
  },
  plugins: [
    new CleanPlugin(['./static/dist'], {verbose: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        'screw_ie8': true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: 'style.min.css',
      allChunks: true
    })
  ],
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.css?$/,
        loaders: ['style-loader', 'raw-loader']
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'sass-loader'] 
        })
      }
    ]
  }
});
