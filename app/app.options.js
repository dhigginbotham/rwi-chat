//app.options.js
var Hapi = require('hapi');

var fs = require('fs')
  , path = require('path');

module.exports = {
  host: 'http://rwi-chat.jit.su/',
  port: 8080,
  views: {
    path: path.join(__dirname, '../', 'views'),
    engine: {
      module: 'handlebars',
      extension: 'html'
    },
    partials: {
      path: path.join(__dirname, '../', 'views', 'parts')
    }
    , layout: true
  },
  cache: {
    engine: 'mongodb',
    partition: 'rwi_chat'
  }
};