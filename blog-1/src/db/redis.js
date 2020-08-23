const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

// 创建 redis 链接对象
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.error('errors', err);
});

// 测试
const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        return reject('error ', err);
      }
      if (key === null) {
        return resolve(null);
      }

      try {
        return resolve(JSON.parse(value));
      } catch (error) {
        return resolve(value);
      }
    });
  });
};
const set = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value, redis.print);
};

module.exports = {
  get,
  set,
};
