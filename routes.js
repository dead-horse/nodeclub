/**!
 * nodeclub - routes.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
var Resource = require('koa-resource-router');
var user = require('./controllers/user');

var METHODS = {update: 'PATCH'};

module.exports = function (app) {
  app.get('/', function * () {
    this.body = '<h3>Hello! node club!</h3>';
  });

  var users = new Resource('users', user);
  app.use(users.middleware(), METHODS);
};
