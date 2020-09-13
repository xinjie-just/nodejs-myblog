const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogData');
const { loginCheck } = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';
  if (ctx.query.isadmin) {
    // 管理员界面
    if (!ctx.session.username) {
      // 未登录
      return (ctx.body = new ErrorModel('未登录'));
    }
    // 强制查询自己的博客
    author = ctx.session.username;
  }
  const listData = await getBlogList(keyword, author); // 传参数顺序不要混淆
  ctx.body = new SuccessModel(listData);
});

router.get('/detail', async (ctx, next) => {
  const detailData = await getBlogDetail(ctx.query.id);
  ctx.body = new SuccessModel(detailData);
});

router.post('/new', loginCheck, async (ctx, next) => {
  if (ctx.session.username) {
    ctx.request.body.author = req.session.username;
  }
  const value = await createBlog(ctx.request.body);
  ctx.body = new SuccessModel(value);
});

router.post('/update', loginCheck, async (ctx, next) => {
  const value = await updateBlog(ctx.query.id, ctx.request.body);
  if (value) {
    ctx.body = new SuccessModel('博客更新成功！');
  } else {
    ctx.body = new ErrorModel('博客更新失败！');
  }
});

router.post('/delete', loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  const value = await deleteBlog(ctx.query.id, author);
  if (value) {
    ctx.body = new SuccessModel('博客删除成功！');
  } else {
    ctx.body = new ErrorModel('博客删除失败！');
  }
});

module.exports = router;
