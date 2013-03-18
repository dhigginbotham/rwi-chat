//default.routes.js
var Hapi = require('hapi')
  , Hoek = require('hoek');

//include socket.io
var io = require('../app/app.server').io;

exports.HomePage = function (request) {
  request.reply.view('pages/index', {
    title: 'RWI Chat '
  }).send();

  io.sockets.on('connection', function (socket) {
    console.log('connected');      
  });
}