/* istanbul ignore next:
enables ES6 ('import'.. etc) in Node */
require('babel-register');
require('babel-polyfill');
/* istanbul ignore next */
require('./server');
