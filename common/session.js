/**!
 * nodeclub - common/logger.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var session = require('koa-sess');
var redisStore = require('koa-redis');
var ms = require('ms');
var config = require('../config');

var key = 'nodeclub.sid';
var cookie = {path: '/', httpOnly: true, maxAge: ms('7d')};

if (config.debug) {
  module.exports = session({
    key: key,
    cookie: cookie
  });
} else {
  module.exports = session({
    key: key,
    cookie: cookie,
    store: redisStore(config.redis)
  });
}
