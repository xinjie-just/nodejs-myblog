const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  getListData,
  getDetailData,
  newBlog,
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
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getListData(keyword, author);
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
    const result = getDetailData(id);
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
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then((value) => {
      return new SuccessModel(value);
    });
  }

  // 更新博客
  if (method === 'POST' && req.url.includes('/api/blog/update')) {
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
