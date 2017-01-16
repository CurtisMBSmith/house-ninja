/**
 * Module dependencies.
 */

var express        = require('express'),
    path           = require('path'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    // favicon        = require('serve-favicon'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    session        = require('express-session'),
    config         = require('./config'),
    routes         = require('./routes');

var db = require('./models/hnin/index');

var SequelizeSessionStore = require('connect-session-sequelize')(session.Store);

var app = express();


/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app
  .use(compress())
  // .use(favicon(__dirname + 'frontend/dist'))
  .use(logger('dev'))
  .use(express.static(path.join(__dirname, 'frontend/dist')))
  .use(bodyParser())
  .use(methodOverride())
  .use(session({
    saveUninitialized: false,
    secret: 'iridescent-emu',
    store: new SequelizeSessionStore({
      db: db,
      table: 'Session'
    })
  }))
  .use('/', routes.rootRouter)
  ;

if (app.get('env') === 'development') {
  app.use(errorHandler());
}


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
