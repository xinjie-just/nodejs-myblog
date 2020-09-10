const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application.json');

  // 访问日志
  console.log('访问日志', Date.now());

  // 错误日志
  console.error('错误日志', Date.now());

  if (req.url === '/err') {
    throw new Error('404 出错了！');
  }

  res.end(
    JSON.stringify({
      code: 0,
      data: 'PM2 fourth test is success!',
    })
  );
});

const env = process.env.NODE_ENV;
if (env === 'dev') {
  // 开发环境使用 nodemon 启动，遇到程序出错，不会自动重启，就会导致无法访问其他的页面
  server.listen(3002, '127.0.0.1', () => {
    console.log('server is run on "http://127.0.0.1:3002"');
  });
} else {
  // 生产环境环境使用 pm2 启动，遇到程序出错，会自动重启，可以照常访问其他的页面
  server.listen(3001, '127.0.0.1', () => {
    console.log('server is run on "http://127.0.0.1:3001"');
  });
}
