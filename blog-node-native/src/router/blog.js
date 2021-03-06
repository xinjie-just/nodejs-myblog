const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogData');

// 统一的登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录！'));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;

  const id = req.query.id;

  // 博客列表
  if (method === 'GET' && req.url.includes('/api/blog/list')) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const pageIndex = req.query.pageIndex || 0;
    const pageSize = req.query.pageSize || 10;
    const result = getBlogList(keyword, author, pageIndex, pageSize); // 传参数顺序不要混淆
    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }
      // 强制查询自己的博客
      author = req.session.username;
    }
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 博客详情
  if (method === 'GET' && req.url.includes('/api/blog/detail')) {
    const result = getBlogDetail(id);
    return result.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  // 新建一条博客
  if (method === 'POST' && req.url.includes('/api/blog/new')) {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      loginCheckResult;
    }
    if (req.session.username) {
      req.body.author = req.session.username;
    }
    const result = createBlog(req.body);
    return result.then((value) => {
      if (value) {
        return new SuccessModel('博客创建成功！');
      } else {
        return new ErrorModel('博客创建失败！');
      }
    });
  }

  // 更新博客
  if (method === 'POST' && req.url.includes('/api/blog/update')) {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      loginCheckResult;
    }
    const result = updateBlog(id, req.body);
    return result.then((value) => {
      if (value) {
        return new SuccessModel('博客更新成功！');
      } else {
        return new ErrorModel('博客更新失败！');
      }
    });
  }

  // 删除一条博客
  if (method === 'POST' && req.url.includes('/api/blog/delete')) {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      loginCheckResult;
    }
    const author = req.session.username;
    const result = deleteBlog(id, author);
    return result.then((value) => {
      if (value) {
        return new SuccessModel('博客删除成功！');
      } else {
        return new ErrorModel('博客删除失败！');
      }
    });
  }
};

module.exports = handleBlogRouter;
