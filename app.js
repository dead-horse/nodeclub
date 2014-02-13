/**!
 * nodeclub - app.js
 *
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var koa = require('koa');
var http = require('http');
var rt = require('koa-rt');
var favicon = require('koa-favicon');
var logger = require('./common/logger');
var session = require('./common/session');
var config = require('./config');

var app = koa();

app.name = 'nodeclub';
app.outputErrors = config.debug;
app.keys = config.cookieKeys;
app.proxy = true; // to support `X-Forwarded-*` header

app.use(favicon());
app.use(rt());
app.use(session);

app.use(function * () {
  this.body = '<h3>Hello! node club!</h3>';
});

app.on('error', function (err) {
  if (!err.status || err.status >= 500) {
    logger.error(err);
  }
});

module.exports = http.createServer(app.callback());
