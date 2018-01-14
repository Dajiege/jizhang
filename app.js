var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var jizhang = require('./routes/jizhang');
var kehu = require('./routes/kehu');
var dingdan = require('./routes/dingdan');
var kaipiao = require('./routes/kaipiao');
var imex = require('./routes/imex');
var xiadan = require('./routes/xiadan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').__express);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24*60*60*1000
  }
}));
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";
  if(err){
    res.locals.message = '<script>alert("'+err+'")</script>';
  }
  next();
})

app.use('/', index);
app.use('/users', users);
app.use('/jizhang', jizhang);
app.use('/kehu', kehu);
app.use('/dingdan', dingdan);
app.use('/kaipiao', kaipiao);
app.use('/imex', imex);
app.use('/xiadan', xiadan);

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
  // res.render('error');
});

module.exports = app;
