/**!
 * nodeclub - proxy/user.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var mysql = require('../common/mysql');
var thunkify = require('thunkify-wrap');

var columns = ' id, name, email, avatar, location, company, blog, \
  followers, following, block, gmt_create ';

var ADD_USER_SQL = 'INSERT INTO user(name, email, password, blog, avatar, \
  location, company, gmt_create, gmt_modified) \
  VALUES(?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';

exports.add = function (params, callback) {
  var args = [params.name, params.email, params.password, params.blog || '',
  params.avatar || '', params.location || '', params.company || ''];
  mysql.query(ADD_USER_SQL, args, callback);
};

exports.update = function (params, callback) {
  var sql = 'UPDATE user set gmt_modified = NOW() ';
  var args = [];
  var props = [ 'password', 'blog', 'avatar', 'location',
  'company', 'block' ];
  props.forEach(function (prop) {
    if (params[prop]) {
      sql += ', ' + prop + '=? ';
      args.push(params[prop]);
    }
  });
  sql += ' WHERE id=?';
  args.push(params.id);

  mysql.query(sql, args, callback);
};

var GET_SQL = 'SELECT ' + columns + ' FROM user WHERE id=?';
exports.get = function (id, callback) {
  mysql.queryOne(GET_SQL, [id], callback);
};

var CHECK_SQL = 'SELECT ' + columns + ' FROM user WHERE name=? AND password=?';
exports.check = function (name, password, callback) {
  mysql.queryOne(CHECK_SQL, [name, password], callback);
};

thunkify(exports);
