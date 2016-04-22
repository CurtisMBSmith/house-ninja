var express = require('express');
var db = require('../models/hnin/index.js');
var router = express.Router({mergeParams: true});
var UserModel = db.User;

function extractUserDetails(req) {
  return {
    email: req.body.username,
    password: req.body.password
  };
}

router.route('/create').post(function(req, res) {
  res.set('Content-Type', 'application/json');

  // res.send(productList);
  res.send('User Created');
});

router.route('/authenticate').post(function(req, res) {
  res.set('Content-Type', 'application/json');
  var userDetails = extractUserDetails(req);

  UserModel.findOne({
    where: {
      email: userDetails.email,
      password: userDetails.password
    }
  }).then(function (user) {
    if (!user) {
      res.status(430).send('Invalid username or password');
      return;
    }
    console.log(user.get('email') + ' authenticated.');
    res.send({user_id: user.get('id')});
  });

});


exports.router = router;
