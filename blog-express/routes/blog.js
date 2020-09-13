var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogData');
const { loginCheck } = require('../middleware/loginCheck');

router.get('/list', (req, res, next) => {
  let author = req.query.author || '';
  const keyword = req.query.keyword || '';
  const pageIndex = req.query.pageIndex || 0;
  const pageSize = req.query.pageSize || 10;
  const result = getBlogList(keyword, author, pageIndex, pageSize); // 传参数顺序不要混淆
  if (req.query.isadmin) {
    // 管理员界面
    if (!req.session.username) {
      // 未登录
      return res.json(new ErrorModel('未登录'));
    }
    // 强制查询自己的博客
    author = req.session.username;
  }
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

router.get('/detail', (req, res, next) => {
  const result = getBlogDetail(req.query.id);
  return result.then((detailData) => {
    res.json(new SuccessModel(detailData));
  });
});

router.post('/new', loginCheck, (req, res, next) => {
  if (req.session.username) {
    req.body.author = req.session.username;
  }
  const result = createBlog(req.body);
  return result.then((value) => {
    if (value) {
      res.json(new SuccessModel('博客创建成功！'));
    } else {
      res.json(new ErrorModel('博客创建失败！'));
    }
  });
});

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body);
  return result.then((value) => {
    if (value) {
      res.json(new SuccessModel('博客更新成功！'));
    } else {
      res.json(new ErrorModel('博客更新失败！'));
    }
  });
});

router.post('/delete', loginCheck, (req, res, next) => {
  const author = req.session.username;
  const result = deleteBlog(req.query.id, author);
  return result.then((value) => {
    if (value) {
      res.json(new SuccessModel('博客删除成功！'));
    } else {
      res.json(new ErrorModel('博客删除失败！'));
    }
  });
});

/* // 验证 session 是否添加成功
router.get('/session-test', function (req, res, next) {
  const session = req.session;
  if (!session.accessCount) {
    session.accessCount = 0;
  }
  session.accessCount++;
  res.send(`accessCount: ${session.accessCount}`);
}); */

module.exports = router;
