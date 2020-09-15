var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/userData');

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password);
  return result
    .then((value) => {
      const data = value.results;
      if (data.username) {
        req.session.username = data.username;
        req.session.realname = data.realname;
        res.json(new SuccessModel('登录成功！'));
      } else {
        res.json(new ErrorModel('用户名或密码错误！'));
      }
    })
    .catch(() => {
      res.json(new ErrorModel('用户名或密码错误！'));
    });
});
/* // 验证是否登录
router.get('/login-test', function (req, res, next) {
  if (req.session.username) {
    res.send('已登录');
  } else {
    res.send('未登录');
  }
}); */

module.exports = router;
