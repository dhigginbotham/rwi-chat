//yar.lib.js
var Hapi = require('hapi');
var http = require('../app/app.server').http;

var options = {
  cookieOptions: {
    password: 'rwiisleetsaezue3214146',   // Required
  },
  session: true
};

http.plugin.allow({ ext: true }).require('yar', options, function (err) {

  if (err) {
    console.log(err)
    throw err;
  }
});