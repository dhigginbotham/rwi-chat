//app.js
var Hapi = require('hapi')
  , Lout = require('lout');

//dependencies
var colors = require('colors');

//init server requirements
var http = require('./app/app.server').http;

//session support
var yar = require('./lib/yar.lib');

//load routes
var DefaultRoutes = require('./routes/default.routes.js');

http.route([
  { method: 'GET', path: '/', handler: DefaultRoutes.HomePage },
  { method: 'GET', path: '/signup', handler: DefaultRoutes.SignupPage },
]);

http.plugin.require('lout', null, function () {

  http.start( function() {
    console.log('   init  -'.green + ' server started on port ' + require('./app/app.options').port);
  });
});
