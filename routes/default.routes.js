//default.routes.js
var Hapi = require('hapi')
  , Hoek = require('hoek');

//include socket.io
var io = require('../app/app.server').io;


var FormsClass = require('../lib/forms.lib').FormsClass;
var FormsConf = require('../conf/forms.conf').forms;

exports.HomePage = function (request) {
  request.reply.view('pages/index', {
    title: 'RWI Chat '
  }).send();

  io.sockets.on('connection', function (socket) {
    console.log('connected');      
  });
}

exports.SignupPage = function (request) {

  FormsClass.makeForm(FormsConf.signup, function(formOutput) {
    console.log(formOutput);
    request.reply.view('pages/signup', {
      title: 'The Unofficial RWI Chat(beta) '
    , form: formOutput
    }).send();
  });

  io.sockets.on('connection', function (socket) {

    // socket.on('signup_form', function(data) {
    //   FormsClass.formatForm(FormsConf.signup, data, function(err, resp) {
    //     return (err) ? console.log(err) : console.log(resp);
    //   });
    // });
  });
}

exports.ChatPage = function (request) {
  request.reply.view('pages/chat', {
    title: 'The Unofficial RWI Chat(beta) '
  }).send();
  
  io.sockets.on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      if(data.length > 1) {

        io.sockets.emit('updatechat', socket.username, data);
      }
      if(data === '/users') {
        io.sockets.emit('connected_users', usernames);
      }
    });

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
      // we store the username in the socket session for this client
      console.log(usernames);
      if (username === usernames[username] || !username) {
        username = 'guest';
      }
      socket.username = username;
      // add the client's username to the global list
      usernames[username] = username;
      // echo to client they've connected
      // socket.emit('updatechat', 'SERVER', 'you have connected');
      // echo globally (all clients) that a person has connected
      // socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
      // update the list of users in chat, client-side
      io.sockets.emit('updateusers', usernames);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
      // remove the username from global usernames list
      delete usernames[socket.username];
      // update list of users in chat, client-side
      io.sockets.emit('updateusers', usernames);
      // echo globally that this client has left
      // socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    }); 
  });

}
