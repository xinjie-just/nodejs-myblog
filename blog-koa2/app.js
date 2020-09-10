const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const morgan = require('koa-morgan');
const fs = require('fs');
const path = require('path');

const index = require('./routes/index');
const users = require('./routes/users');
const blog = require('./routes/blog');
const user = require('./routes/user');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  const filePath = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(filePath);
  app.use(
    morgan('combined', {
      stream: writeStream,
    })
  );
}

app.keys = ['GxqLxj19931992'];

app.use(
  session({
    // 设置 cookie
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    // 配置 redis
    store: redisStore({
      all: '127.0.0.1:6379',
    }),
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
