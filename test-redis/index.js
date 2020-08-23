const redis = require('redis');

// 创建 redis 链接对象
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', (err) => {
  console.error('errors', err);
});

// 测试
redisClient.set('username', 'zhangsan2', redis.print);
redisClient.get('username', (err, value) => {
  if (err) {
    console.error('error ', err);
    return;
  }
  console.log('value', value);
  redisClient.quit();
});
