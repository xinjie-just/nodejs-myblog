const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

// 创建 redis 链接对象
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.error('errors', err);
});

module.exports = { redisClient };
