var express = require('express'),
    db = require('../models/hnin/index.js'),
    bcrypt = require('bcrypt'),
    logger = require('bunyan').createLogger({name: 'UserController'});

var router = express.Router({mergeParams: true});
var UserModel = db.User;

const saltRounds = 11;

function validateUserDetails(req) {
  if (!req.body.email || !req.body.password || !req.body.givenName ||
      !req.body.surname) {
    return 'Missing one or more required fields.';
  }

  if (req.body.password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  return null;
}

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

  var validation = validateUserDetails(req);
  if (validation) {
    res.status(430).send({isError: true, err: validation});
    return;
  }

  UserModel.findOne({
    where: {
      email: req.body.email
    },
    attributes: {
      exclude: ['password']
    }
  }).then(function (user) {
    if (user) {
      res.status(430).send({isError: true, err: 'A user already exists with that email address.'});
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
          console.log(err);
          res.status(500).send({isError: true, err: 'An error occurred. See error logs for details.'});
          return;
        }

        UserModel.create({
          email: req.body.email,
          givenName: req.body.givenName,
          surname: req.body.surname,
          password: hash
        }).then(function(user) {
          req.session.user = {
            id: user.get('id'),
            email: user.get('email')
          };
          res.send(user);
        });
      });
    }
  });
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
      email: userDetails.email
    }
  }).then(function (user) {
    if (!user) {

      res.status(430).send({
        err: 'Invalid username or password.',
        isError: true
      });
      return;
    }
    bcrypt.compare(userDetails.password, user.get('password'), function(err, result) {
      if (err || result == false) {
        res.status(430).send({
          err: 'Invalid username or password.',
          isError: true
        });
        return;
      }
      logger.info(user.get('email') + ' authenticated.');
      req.session.user = {
        id: user.get('id'),
        email: user.get('email')
      };
      res.send(user);
    });
  });

});

router.route('/details').get(function(req1, res1) {
  validateSession(req1, res1, function(req, res) {
    UserModel.findOne({
      where: {
        id: req.session.user.id
      },
      attributes: {
        exclude: ['password']
      }
    }).then(function (user) {
      res.send(user);
    });
  });
});

exports.router = router;
exports.validateSession = validateSession;
