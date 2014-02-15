/**!
 * nodeclub - proxy/user.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var mysql = require('../common/mysql');
var thunkify = require('thunkify');

var columns = ' id, name, email, avatar_url as avatar, location, company, blog, \
  followers, following, block, gmt_create ';

var ADD_USER_SQL = 'INSERT INTO user(name, email, password, blog, avatar_url, \
  location, company, gmt_create, gmt_modified) \
  VALUES(?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';

exports.addUser = function (params, callback) {
  var args = [params.name, params.email, params.password, params.blog || '',
  params.avatar || '', params.location, params.company];
  mysql.query(ADD_USER_SQL, args, callback);
};

exports.addUser = function (params, callback) {
  mysql.query('show tables', callback);
};

exports.addUser = thunkify(exports.addUser);

