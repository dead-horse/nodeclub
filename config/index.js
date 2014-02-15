/**!
 * nodeclub - config/index.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

fs.existsSync = fs.existsSync || path.existsSync;
var pkg = require('../package.json');

var root = path.dirname(__dirname);

var config = {
  version: pkg.version,
  webPort: 7001,
  enableCluster: false,
  debug: true, // if debug
  logdir: path.join(root, '.tmp', 'logs'),
  viewCache: false,
  cookieKeys: ['nodeclub secret', 'haha other key'],

  mysql: {
    servers: [
      {
        host: 'keydiary.mysql.rds.aliyuncs.com', // 'db4free.net'
        port: 3306,
        user: 'nodeclub_dev',
        password: 'nodeclub_dev'
      }
    ],
    database: 'nodeclub_dev',
    maxConnections: 4,
    queryTimeout: 5000,
  },

};

// load config/config.js, everything in config.js will cover the same key in index.js
var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  var options = require(customConfig);
  for (var k in options) {
    config[k] = options[k];
  }
}

mkdirp.sync(config.logdir);

module.exports = config;
