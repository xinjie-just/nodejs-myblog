const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/userData');
const { set } = require('../db/redis');

// 获取 cookie 的过期时间
const getExpiresTime = () => {
  const time = new Date();
  time.setTime(time.getTime() + 24 * 60 * 60 * 1000);
  return time.toGMTString();
};

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 用户登录
  if (method === 'POST' && req.url.includes('/api/user/login')) {
    const { username, password } = req.body;
    // const { username, password } = req.query;
    const result = login(username, password);
    return result
      .then((value) => {
        if (value.username) {
          req.session.username = value.username;
          req.session.realname = value.realname;
          // 将 session 同步到 redis 中
          set(req.sessionId, req.session);
          // console.log('session...', value.username, value.realname);
          return new SuccessModel('登录成功！');
        } else {
          return new ErrorModel('用户名或密码错误！');
        }
      })
      .catch(() => {
        return new ErrorModel('用户名或密码错误！');
      });
  }

  /* // 是否登录成功，做测试
  if (method === 'GET' && req.url.includes('/api/user/test-login')) {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({ session: req.session }, '已经登录！')
      );
    } else {
      return Promise.resolve(new ErrorModel('尚未登录！'));
    }
  } */
};

module.exports = { handleUserRouter, getExpiresTime };
