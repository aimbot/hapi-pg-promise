/**
 * hapi-pg-promise
 * author: Shawn Turner
 */
var options = {
  connect: function(client){
    var cp = client.connectionParameters;
    console.log("Connected to database '" + cp.database + "'");
  },
  disconnect: function(client){
    var cp = client.connectionParameters;
    console.log("Disconnecting from database '" + cp.database + "'");
  },
  query: function (e) {
    console.log("Query:", e.query);
  },
  error: function (err, e) {
    console.log("Error: " + err);
  },
  promiseLib: require('bluebird')
};

var pgp = require('pg-promise')(options);

exports.register = function (server, options, next) {

  var db = pgp(options);
  server.expose('db', db);
  server.expose('pgp', pgp);

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
