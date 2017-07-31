/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database'); // get db config file
var helmet = require('helmet'); // small security for headers (not enough!)

// connect to database
mongoose.connect(config.database, function(err){
  if(err) {
    console.log(err);
    console.log("!!!NO SERVER CONNECTED!!!");
    process.exit(1);
  }
});

// pass passport for configuration
require('./config/passport')(passport);

var index = require('./routes/index');
var auth = require('./routes/api_auth');
var middleware = require('./routes/api_middleware');
var iot = require('./routes/api_iot');
var events = require('./routes/api_events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet({
  noCache: true
})); // small security for headers (not enough!)

app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api', middleware);
app.use('/api/iot', iot);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;