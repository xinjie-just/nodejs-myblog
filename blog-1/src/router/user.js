const { SuccessModel, ErrorModel } = require('../model/resModel');
const { loginCheck } = require('../controller/userData');

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 用户登录
  if (method === 'POST' && req.url.includes('/api/user/login')) {
    const { username, password } = req.body;

    console.log('username,password', req.body);
    const value = loginCheck(username, password);
    if (value) {
      return new SuccessModel('登录成功！');
    } else {
      return new ErrorModel('登录失败！');
    }
  }
};

module.exports = handleUserRouter;
