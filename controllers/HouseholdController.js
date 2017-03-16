var express = require('express'),
    db = require('../models/hnin/index.js'),
    validateSession = require('./UserController.js').validateSession;

var router = express.Router({mergeParams: true});
var Household = db.Household;
var User = db.User;

router.route('/details').get(function(req1, res1) {
  validateSession(req1, res1, function(req, res) {
    Household.findAll({
      include: [{
        model: User,
        through: {
          where: {userId: req.session.user.id }
        },
        attributes: {
          exclude: ['password']
        }
      }]
    }).then(function (household) {
      if (!household) {
        res.status(404).send({
          err: 'No household found'
        });
      }

      res.send(household);
    });
  });
});

exports.router = router;