/**!
 * nodeclub - common/mysql.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var mysql = require('mysql');
var config = require('../config').mysql;

var server = config.servers[0];

// TODO: query timeout
var pool = mysql.createPool({
  host: server.host,
  port: server.port,
  user: server.user,
  password: server.password,
  database: config.database,
  connectionLimit: config.maxConnections,
  multipleStatements: true,
});

exports.pool = pool;

exports.query = function (sql, values, callback) {
  console.log(arguments);
  pool.query(sql, values, callback);
};

exports.queryOne = function (sql, values, callback) {
  exports.query(sql, values, function (err, rows) {
    rows = rows ? rows[0] : rows;
    callback(err, rows);
  });
};

exports.escape = function (val) {
  return pool.escape(val);
};
