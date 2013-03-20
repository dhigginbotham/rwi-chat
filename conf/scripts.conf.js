//scripts.conf.js
/*
@author: David Higginbotham
@email: david@hillsoft.com
*/
 
var scriptLoader = {};
 
scriptLoader.files = [
 
  //header scripts
  {path:'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', name:'jquery.min.js', where:'head', url:'/', type: 'js'},
  {path:'//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js', name:'bootstrap.min.js', where:'head', url:'/', type: 'js'},
  {path:'/socket.io/socket.io.js', name:'socket-io', where:'head', url: '/', type: 'js'},
 
  //header css
  {path:'//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css', name:'bootstrap-combined.min.css', where:'head', url:'/', type: 'css'},
  {path:'/css/signup.css', name: 'signup.css', where: 'head', url: '/signup', type: 'css'},
 
  //footer scripts
  {path:'/js/helpers.client.js', name:'helpers.client.js', where:'foot', url: '/', type: 'js'},
 
];

var colors = require('colors');

exports.ManageScriptLoader = function(request, type, callback) {
 
  var internals = scriptLoader.files;
 
  var loaded = {
    head: [],
    foot: []
  };
  
  for(var i=0;i<internals.length;++i) {
 
    var f = internals[i];
 
    if ( (f.where === 'head' && f.url === request.url.pathname && f.type === type ) || (f.where === 'head' && f.url === '/' && f.type === type ) ) {
      // console.log(colors.cyan('   loading - ' + f.name + ' to ') + f.where);
      loaded.head.push(f);
    }
 
    if ( (f.where === 'foot' && f.url === request.url.pathname && f.type === type ) || (f.where === 'foot' && f.url === '/' && f.type === type ) ) {
      // console.log(colors.cyan('   loading - ' + f.name + ' to ') + f.where);
      loaded.foot.push(f);
    }
 
  }
 
  return (callback) ? callback(loaded) : loaded;
}
 