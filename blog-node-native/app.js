const handleBlogRouter = require('./src/router/blog');
const { get, set } = require('./src/db/redis');
const { writeLogs } = require('./src/utils/log');
const { handleUserRouter, getExpiresTime } = require('./src/router/user');
const querystring = require('querystring');

/* const SESSION_DATA = {}; */

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return resolve({});
    }
    if (req.headers['content-type'] !== 'application/json') {
      return resolve({});
    }
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        return resolve({});
      }
      return resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  writeLogs(
    `${req.method} -- ${req.url} -- ${
      req.headers['user-agent']
    } -- ${Date.now()}`
  );
  res.setHeader('Content-type', 'application/json');

  /*
   * querystring.decode 是 querystring.parse 的别名，方法将 URL 查询字符串 str 解析为键值对的集合。
   * 'foo=bar&abc=xyz&abc=123' 会被解析为 {foo: 'bar', abc: ['xyz', '123']}
   */
  req.query = querystring.parse(req.url.split('?')[1]);

  // 解析 cookie
  const cookieStr = req.headers.cookie || ''; // 'k1=v1;k2=v2;k3=v3'
  req.cookie = {};
  cookieStr.split(';').forEach((element) => {
    if (!element) return;
    const arr = element.split('=');
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  // 处理 session
  /* let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
      if (!SESSION_DATA[userId]) {
        SESSION_DATA[userId] = {};
      }
    } else {
      needSetCookie = true;
      userId = `${Date.now()}_${Math.random()}`;
      SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId]; */

  // 使用 redis 解析 session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的 session 值
    set(userId, {});
  }

  // 获取 session
  req.sessionId = userId;
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData === null) {
        // 初始化 redis 中的 session 值
        set(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        req.session = sessionData;
      }
      // 处理 post data
      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;
      // 处理博客
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        return blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getExpiresTime()}`
            );
          }
          res.end(JSON.stringify(blogData));
        });
      }

      // 处理用户
      const userResult = handleUserRouter(req, res);
      if (userResult) {
        return userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getExpiresTime()}`
            );
          }
          res.end(JSON.stringify(userData));
        });
      }

      res.writeHead(404, {
        'Content-type': 'text/plain;charset=utf8',
      }); // writeHead 方法只能在消息上调用一次，并且必须在 res.end() 前调用。
      res.end('404 not found');
    });
};

module.exports = serverHandle;

// env: process.env.NODE_ENV,
