var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var blogRouter = require('./routes/blog');

var app = express();

/* // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */

const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  app.use(logger('dev'));
} else {
  const filePath = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(filePath);
  app.use(
    logger('combined', {
      stream: writeStream,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/*
 * 如果导出的时候是一个对象，这里就必须定义一个对象来接收（module.exports = {redisClient}, const { redisClient } = require('./db/redis')）
 * 如果导出的是一个变量，这里酒必须定义一个变量来接收（module.exports = redisClient, const redisClient = require('./db/redis')）
 */
const { redisClient } = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient,
});

app.use(
  session({
    secret: 'GxqLxj19931992',
    cookie: {
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
);

/* app.use('/', indexRouter);
app.use('/users', usersRouter); */
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  /* res.json({
     message: err.message,
     error: err,
   }); */
});

module.exports = app;
