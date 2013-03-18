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

exports.SignupPage = function (request) {
  request.reply.view('pages/signup', {
    title: 'The Unofficial RWI Chat(beta) '
  , form: require('../conf/forms.conf').signup
  }).send();

  io.sockets.on('connection', function (socket) {
    console.log('connected');

    socket.on('signup_form', function(data) {
      console.log(data);
    })    
  });
}
