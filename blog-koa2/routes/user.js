const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/userData');

router.prefix('/api/user');

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const value = await login(username, password);

  try {
    if (value.username) {
      ctx.session.username = value.username;
      ctx.session.realname = value.realname;
      ctx.body = new SuccessModel('登录成功！');
    } else {
      ctx.body = new ErrorModel('用户名或密码错误！');
    }
  } catch (err) {
    ctx.body = new ErrorModel('用户名或密码错误！');
  }
});

/* router.get('/session-test', async function (ctx, next) {
  if (!ctx.session.accessCount) {
    ctx.session.accessCount = 0;
  }
  ctx.session.accessCount++;
  ctx.body = {
    code: 0,
    accessCount: ctx.session.accessCount,
  };
}); */

module.exports = router;
