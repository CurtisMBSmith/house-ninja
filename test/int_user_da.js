'use strict';

var db = require('../models/hnin/index.js');
var should = require('chai').should();
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var User = db.User;

chai.use(chaiAsPromised);

describe('User', function() {
  describe('#create()', function() {
    it('should save without error ', function() {
      return User.create({
        email: 'testemail' + Math.random() + '@testsite.test',
        givenName: 'Test',
        surname: 'User',
        password: 'TestUserPassword1'
      }).then(function(returnedUser) {
        expect(returnedUser.id).to.be.equal(3);
      });

    });
  });
});