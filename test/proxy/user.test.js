/**!
 * nodeclub - test/proxy/user.test.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var User = require('../../proxy/user');
var mysql = require('../../common/mysql');

function clean(done) {
  mysql.query('DELETE FROM user where name = "test"', done);
};

var userId;

describe('test/proxy/user.test.js', function () {
  before(clean);
  after(clean);

  describe('add()', function () {
    it('should add ok', function (done) {
      User.add({
        name: 'test',
        email: 'test@gmail.com',
        password: '12345'
      }, function (err, res) {
        should.not.exist(err);
        res.affectedRows.should.equal(1);
        userId = res.insertId;
        done();
      });
    });

    it('should add error by name repeat', function (done) {
      User.add({
        name: 'test',
        email: 'test_test@gmail.com',
        password: '12345'
      }, function (err) {
        err.code.should.equal('ER_DUP_ENTRY');
        err.message.should.not.equal('Duplicate entry \'test\' for key \'name\'');
        done();
      });
    });

    it('should add error by email repeat', function (done) {
      User.add({
        name: 'test1',
        email: 'test@gmail.com',
        password: '12345'
      }, function (err) {
        err.code.should.equal('ER_DUP_ENTRY');
        err.message.should.not.equal('Duplicate entry \'test@gmail.com\' for key \'email\'');
        done();
      });
    });
  });

  describe('get()', function () {
    it('should get ok', function (done) {
      User.get(userId, function (err, user) {
        should.not.exist(err);
        user.should.have.keys(['id', 'name', 'email', 'location', 'avatar',
          'company', 'blog', 'followers', 'following', 'block', 'gmt_create']);
        done();
      });
    });

    it('should get not exit user ok', function (done) {
      User.get(-1, function (err, user) {
        should.not.exist(err);
        should.not.exist(user);
        done();
      });
    });
  });

  describe('update()', function () {
    it('should update ok', function (done) {
      User.update({
        id: userId,
        location: 'hangzhou',
        company: 'none',
        blog: 'blog.com'
      }, function (err, data) {
        should.not.exist(err);
        User.get(userId, function (err, user) {
          user.location.should.equal('hangzhou');
          user.company.should.equal('none');;
          user.blog.should.equal('blog.com');
          done();
        });
      });
    });

    it('should ignore update name or email', function (done) {
      User.update({
        id: userId,
        name: 'hangzhou',
        email: 'none'
      }, function (err, data) {
        should.not.exist(err);
        User.get(userId, function (err, user) {
          user.name.should.equal('test');
          user.email.should.equal('test@gmail.com');
          done();
        });
      });
    });
  });

  describe('check()', function () {
    it('should check ok', function (done) {
      User.check('test', '12345', function (err, user) {
        should.not.exist(err);
        user.should.have.keys(['id', 'name', 'email', 'location', 'avatar',
          'company', 'blog', 'followers', 'following', 'block', 'gmt_create']);
        done();
      });
    });

    it('should check password error', function (done) {
      User.check('test', '1234', function (err, user) {
        should.not.exist(err);
        should.not.exist(user);
        done();
      });
    });
  });
});
