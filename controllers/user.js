/**!
 * nodeclub - controllers/user.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var User = require('../proxy/user');

exports.index = function *(next) {
  this.body = 'GET /users';
};

exports.create = function *(next) {
  this.status = 201;
  this.body = {ok: true};
};

exports.show = function *(next) {
  this.body = 'GET /users/' + this.params.user;
};

exports.update = function *(next) {
  this.status = 201;
  this.body = {ok: true};
};

