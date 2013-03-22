//default.routes.js
var Hapi = require('hapi')
  , Hoek = require('hoek');

//include socket.io
var io = require('../app/app.server').io;


var FormsClass = require('../lib/forms.lib').FormsClass;
var FormsConf = require('../conf/forms.conf').forms;

var ScriptManager = require('../conf/scripts.conf');

exports.HomePage = function (request) {
// usernames which are currently connected to the chat
var usernames = {};
var count = usernames.length;

  ScriptManager.ManageScriptLoader(request, 'css', function(css) {

    ScriptManager.ManageScriptLoader(request, 'js', function(js) {

      request.reply.view('pages/index', {
        title: 'RWI Chat '
      , embed: js
      , style: css
      }).send();

      io.sockets.on('connection', function (socket) {

        socket.on('sendchat', function (data) {

          if(data.length > 1) {

            io.sockets.emit('updatechat', socket.username, data);
          }
          if(data === '/users') {
            io.sockets.emit('connected_users', usernames);
          }
        });

        socket.on('adduser', function(username){

          if (username === usernames[username] || !username) {
            username = 'guest';
          }
          socket.username = username;
          usernames[username] = username;
          io.sockets.emit('updateusers', usernames);
        });

        socket.on('disconnect', function(){
          delete usernames[socket.username];
          io.sockets.emit('updateusers', usernames);
        }); 
      });

    });
  });
}

exports.LoginPage = function (request) {

  ScriptManager.ManageScriptLoader(request, 'css', function(css) {

    ScriptManager.ManageScriptLoader(request, 'js', function(js) {

      FormsClass.makeForm(FormsConf.signup, function(formOutput) {
        request.reply.view('pages/login', {
          title: 'The Unofficial RWI Chat(beta) '
        , form: formOutput
        , embed: js
        , style: css
        }).send();
      });

      io.sockets.on('connection', function (socket) {

        socket.on('register', function (data) {
          FormsClass.formatForm(FormsConf.signup, data, function(form) {
            console.log(form);
          });
        });
      });

    });
  });

}

exports.ChatPage = function (request) {
// usernames which are currently connected to the chat
var usernames = {};
var count = usernames.length;

  ScriptManager.ManageScriptLoader(request, 'css', function(css) {

    ScriptManager.ManageScriptLoader(request, 'js', function(js) {

      request.reply.view('pages/chat', {
        title: 'The Unofficial RWI Chat(beta) '
        , embed: js
        , style: css
      }).send();
      
      io.sockets.on('connection', function (socket) {

        socket.on('sendchat', function (data) {

          if(data.length > 1) {

            io.sockets.emit('updatechat', socket.username, data);
          }
          if(data === '/users') {
            io.sockets.emit('connected_users', usernames);
          }
        });

        socket.on('adduser', function(username){

          if (username === usernames[username] || !username) {
            username = 'guest';
          }
          socket.username = username;
          usernames[username] = username;
          io.sockets.emit('updateusers', usernames);
        });

        socket.on('disconnect', function(){
          delete usernames[socket.username];
          io.sockets.emit('updateusers', usernames);
        }); 
      });

    });
  });
}
