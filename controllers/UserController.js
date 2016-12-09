var express = require('express'),
    jwt = require('jsonwebtoken'),
    db = require('../models/hnin/index.js');

var router = express.Router({mergeParams: true});
var UserModel = db.User;

function extractUserDetails(req) {
  console.log(req.body);
  return {
    email: req.body.username,
    password: req.body.password
  };
}

/**
 * Creates an authentication token for the uer.
 */
function createAuthenticationToken(userRecord) {
  // Copy the user to a new object containing any relevant pieces
  // of information from the db object because the db object
  // contains a circular reference and doesn't serialize to JSON nicely.
  var user = {
    user_id: userRecord.get('id')
  };

  return jwt.sign(user, 'some_secret');
}

router.route('/create').post(function(req, res) {
  res.set('Content-Type', 'application/json');

  res.send('User Created');
});

router.route('/authenticate').post(function(req, res) {
  res.set('Content-Type', 'application/json');
  var userDetails = extractUserDetails(req);
  console.log(userDetails);

  UserModel.findOne({
    where: {
      email: userDetails.email,
      password: userDetails.password
    }
  }).then(function (user) {
    if (!user) {

      res.status(430).send({
        err: 'Invalid username or password.',
        isError: true
      });
      return;
    }
    console.log(user.get('email') + ' authenticated.');
    res.send({id_token: createAuthenticationToken(user)});
  });

});

exports.router = router;
