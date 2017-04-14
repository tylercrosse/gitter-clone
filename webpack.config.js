const path              = require('path');
const webpack           = require('webpack');
const CleanPlugin       = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');
const entryPath = './src/client/index.js';
const vendors = [
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
];
const sharedSassLoaders = [
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: {
      plugins() {
        return [
          require('autoprefixer')({
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          })
        ];
      }
    }
  },
  // { loader: 'resolve-url-loader' }, // @fontface
  {
    loader: 'sass-loader',
    options: {sourceMap: true}
  }
];
// ------------------------------------
// Base Config
// ------------------------------------
const webpackConfig = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.resolve(__dirname, 'static/'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './src')],
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  }
};
// ------------------------------------
// Env Specfic config
// ------------------------------------
if (isProd) {
  webpackConfig.devtool = 'cheap-module-source-map';
  webpackConfig.entry.app = [
    entryPath
  ];
  webpackConfig.plugins.push(
    new CleanPlugin([
      'static/js',
      'static/css'
    ], {verbose: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: 'style.min.css',
      allChunks: true
    })
  );
  webpackConfig.module.loaders.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          ...sharedSassLoaders
        ]
      })
    }
  );
} else {
  // not production (dev)
  webpackConfig.devtool = 'source-map';
  webpackConfig.entry.app = [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    entryPath
  ];
  webpackConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  );
  webpackConfig.module.loaders.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          ...sharedSassLoaders
        ]
      })
    }
  );
}

module.exports = webpackConfig;