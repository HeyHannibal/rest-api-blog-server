
require('dotenv').config()
console.log(process.env) 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var async = require('async')
var mongoose = require('mongoose');
const cors = require('cors');

var mongoDB = process.env.mongoURL
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});


var db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // if true, body with the message's text is accessible in the request whether it is send by a regular POST request or a POST request from a HTML form. 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
