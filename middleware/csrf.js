/**!
 * nodeclub - middleware/csrf.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

module.exports = function *csrf(next) {
  // do not check when test
  if (process.env.NODE_ENV === 'test') {
    return yield next;
  }
  if (this.method === 'GET' || this.method === 'HEAD' || this.method === 'OPTIONS') {
    return yield next;
  }

  this.assertCsrf();
  yield next;
};
