var express = require('express'),
    controllers = require('../controllers');

var rootRouter = express.Router();

rootRouter.use('/users', controllers.UserCntrl.router)
  .use('/household', controllers.HouseholdCntrl.router);
rootRouter
  .route('/')
  .all(controllers.index);

exports.rootRouter = rootRouter;
