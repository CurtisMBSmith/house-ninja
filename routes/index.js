var express = require('express'),
    controllers = require('../controllers'),
    jwt = require('express-jwt');

var rootRouter = express.Router();

/**
 * Holds any routes that should be excluded from authentication.
 */
var excluded = [
  '/',
  '/js/*',
  '/css/*',
  '/vendor/*',
  '/users/create',
  '/users/authenticate',
  ];

/**
 * Apply authentication middleware.
 */
rootRouter.use(jwt({secret: 'some_secret'})
    .unless({path: excluded }));

rootRouter.use('/users', controllers.UserCntrl.router);

rootRouter
  .route('/')
  .all(controllers.index);

exports.rootRouter = rootRouter;
