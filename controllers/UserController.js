var express = require('express'),
    db = require('../models/hnin/index.js');

var router = express.Router({mergeParams: true});
var UserModel = db.User;

function extractUserDetails(req) {
  console.log(req.body);
  return {
    email: req.body.username || null,
    password: req.body.password || null
  };
}

function validateSession(req, res, next) {
  if (req.session == null || req.session.user == null) {
    res.status(401).send();
    return;
  } else {
    UserModel.findOne({
      where: {
        id: req.session.user.id
      }
    }).then(function (user) {
      if (!user) {
        res.status(401).send();
        return;
      }

      next(req, res);
    });
  }
}

function destroySession(req, success, error)  {
  req.session.destroy(function(err) {
    if (err) {
      error(err);
    } else {
      success();
    }
  });
}

router.route('/destroy').put(function(req, res) {
  destroySession(req, function() {
    res.status(204).send();
  }, function(err) {
    console.log(err);
    res.status(500).send();
  });
});

router.route('/create').post(function(req, res) {
  res.set('Content-Type', 'application/json');

  res.send('User Created');
});

router.route('/authenticate').post(function(req, res) {
  res.set('Content-Type', 'application/json');
  var userDetails = extractUserDetails(req);

  if (userDetails.email === null || userDetails.password === null) {
    res.status(430).send({
      err: 'Invalid username or password.',
      isError: true
    });
    return;
  }

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
    req.session.user = {
      id: user.get('id'),
      email: user.get('email')
    };
    res.send({display_name: user.get('email')});
  });

});

router.route('/details').get(function(req1, res1) {
  validateSession(req1, res1, function(req, res) {
    UserModel.findOne({
      where: {
        id: req.session.user.id
      }
    }).then(function (user) {
      res.send({display_name: user.get('email')});
    });
  });
});

exports.router = router;
