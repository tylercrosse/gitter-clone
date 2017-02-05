/* istanbul ignore next:
enables ES6 ('import'.. etc) in Node */
require('babel-register')({
  presets: ['latest']
});
/* istanbul ignore next */
require('./server');
