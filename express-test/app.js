const express = require('express');

// 本次 http 请求的实例
const app = express();

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url);
  next();
});

app.use((req, res, next) => {
  // 假设在处理 cookie
  console.log('第二步...');
  next();
});

app.use((req, res, next) => {
  // 假设处理 post data
  // 异步
  setTimeout(() => {
    console.log('第三步，异步');
    next();
  });
});

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由');
  next();
});

app.get('/api', (req, res, next) => {
  console.log('get /api 路由');
  next();
});
app.post('/api', (req, res, next) => {
  console.log('post /api 路由');
  next();
});

// 模拟登录验证
function loginCheck(req, res, next) {
  setTimeout(() => {
    console.log('模拟登陆失败');
    res.json({
      errno: -1,
      msg: '登录失败',
    });

    // console.log('模拟登陆成功')
    // next()
  });
}

app.get('/api/get-cookie', (req, res, next) => {
  console.log('get /api/get-cookie');
  res.json({
    errno: 0,
    data: 'data',
  });
});

app.post('/api/get-post-data', loginCheck, (req, res, next) => {
  console.log('post /api/get-post-data');
  res.json({
    errno: 0,
    data: req.body,
  });
});

app.use((req, res, next) => {
  console.log('处理 404');
  res.json({
    errno: -1,
    msg: '404 not fount',
  });
});

app.listen(3333, () => {
  console.log('server is running on port 3333');
});
