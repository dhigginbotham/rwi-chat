//app.server.js
var Hapi = require('hapi')
  , socketIO = require('socket.io')
  , options = require('./app.options');

var http = exports.http = new Hapi.Server(/*'localhost', 3005, */options);
var io = exports.io = socketIO.listen(http.listener);

// usernames which are currently connected to the chat
var usernames = {};
var pUsernames = {};

var priv = io
  .of('/priv')
  .on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      if(data.length > 1 && data.length < 600) {

        priv.emit('updatechat', socket.username, data);
      }
    })

    // when the client emits 'adduser', this listens and executes
    .on('adduser', function(username){
      // we store the username in the socket session for this client
      console.log(pUsernames);
      if (username === pUsernames[username] || !username) {
        username = 'guest';
      }
      socket.username = username;
      // add the client's username to the global list
      pUsernames[username] = username;
      // echo to client they've connected
      // socket.emit('updatechat', 'SERVER', 'you have connected');
      // echo globally (all clients) that a person has connected
      // socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
      // update the list of users in chat, client-side
      priv.emit('updateusers', pUsernames);
    })

    // when the user disconnects.. perform this
    .on('disconnect', function(){
      // remove the username from global pUsernames list
      delete pUsernames[socket.username];
      // update list of users in chat, client-side
      priv.emit('updateusers', pUsernames);
      // echo globally that this client has left
      // socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    })
});

var pub = io
  .of('/pub')
  .on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      if(data.length > 1 && data.length < 600) {

        pub.emit('updatechat', socket.username, data);
      }
    })

    // when the client emits 'adduser', this listens and executes
    .on('adduser', function(username){
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
      pub.emit('updateusers', usernames);
    })

    // when the user disconnects.. perform this
    .on('disconnect', function(){
      // remove the username from global usernames list
      delete usernames[socket.username];
      // update list of users in chat, client-side
      pub.emit('updateusers', usernames);
      // echo globally that this client has left
      // socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    })
});