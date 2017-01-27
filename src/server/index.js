require('babel-register')({
  presets: ['latest']
}); // enables ES6 ('import'.. etc) in Node
require('./server');
