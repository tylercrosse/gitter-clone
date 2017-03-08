const path    = require('path');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const config  = require('./webpack.config.base');

module.exports = merge(config, {
  devtool: 'source-map',
  entry: {
    application: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        query: {
          plugins: [
            [
              'react-transform', {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }
                ]
              }
            ]
          ]
        },
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.css?$/,
        loaders: ['style-loader', 'raw-loader']
      }, {
        test: /\.scss$/,
        use : [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }
        ]
      }
    ]
  }
});
