//iron.lib.js
var Iron = require('iron')
  , Boom = require('boom');

var key = 'rwi$#@4WE#$&#^&%zNKLwc5423hg@#$%&$#!@$^^%%$%$nl';

var internals = exports.TokenClass = {};

internals.schema = function (request, ctx, callback) {
  
  var schema = {};

  if (ctx.id) {
    //we can make a token!
    schema.id = ctx.id;
    schema.user = ctx.user;
    schema.host = request.raw.req.connection.remoteAddress;
    schema.created = new Date().valueOf();
  } else {
    return Boom.internal('some message', ctx);
  }

};

internals.expire = function(callback) {
  
  var date = new Date();

    return (callback) ? callback(date.setDate(date.getDate()+1)) : date.setDate(date.getDate()+1);
};

internals.seal = function(request, ctx, callback) {

  var s = (ctx) ? ctx : {};
  s.exp_date = this.expire();

  if (!s.exp_date) {
    return request.reply({"error":"this tokens expire date is invalid"});
  }

  Iron.seal(ctx, key, Iron.defaults, function (err, sealed) {

    if (request.session) {
      request.session.auth_token = sealed;
    }

    if (callback) {
      return callback(err, sealed);
    } else {
      if (err) {
        return Boom.internal('some message', err);
      } else {
        return sealed;
      }
    }
  });
};

internals.unseal = function(request, ctx, callback) {

  var s = (ctx) ? ctx : null;
  var now = new Date().valueOf();

  Iron.unseal(ctx, key, Iron.defaults, function (err, unsealed) {
    
    if (now < unsealed.exp_date) {
      return (!callback) ? request.reply(unsealed) : callback(unsealed); 
    } else {
      return request.reply({"error": "this token is expired...", "exp": unsealed.exp_date});
    }
  });
};

