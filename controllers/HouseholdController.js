var express = require('express'),
    db = require('../models/hnin/index.js'),
    validateSession = require('./UserController.js').validateSession;

var router = express.Router({mergeParams: true});
var Household = db.Household;
var User = db.User;

router.route('/details').get(function(req1, res1) {
  validateSession(req1, res1, function(req, res) {
    console.log('Finding household for user ' + req.session.user.id);
    User.findOne({
      where: {
        id: req.session.user.id
      },
      include: [{
        model: Household

      }]
    }).then(function (user) {
      if (!user || user.Households.length === 0) {
        res.status(430).send({
          err: 'No household found',
          isError: true
        });
      }

      res.send(user.Households[0]);
    });
  });
});

exports.router = router;