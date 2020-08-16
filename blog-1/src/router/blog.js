const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  getListData,
  getDetailData,
  newBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogData');

const handleBlogRouter = (req, res) => {
  const method = req.method;

  const id = req.query.id;

  // 博客列表
  if (method === 'GET' && req.url.includes('/api/blog/list')) {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    /* const listData = getListData(author, keyword);
    return new SuccessModel(listData); */
    const result = getListData(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 博客详情
  if (method === 'GET' && req.url.includes('/api/blog/detail')) {
    /* const detailData = getDetailData(id);
    return new SuccessModel(detailData); */
    const result = getDetailData(id);
    return result.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  // 新建一条博客
  if (method === 'POST' && req.url.includes('/api/blog/new')) {
    const value = newBlog(req.body);
    return new SuccessModel(value);
  }

  // 更新博客
  if (method === 'POST' && req.url.includes('/api/blog/update')) {
    const value = updateBlog(id, req.body);
    if (value) {
      return new SuccessModel();
    } else {
      return new ErrorModel('博客更新失败！');
    }
  }

  // 删除一条博客
  if (method === 'POST' && req.url.includes('/api/blog/delete')) {
    const value = deleteBlog(id);
    if (value) {
      return new SuccessModel();
    } else {
      return new ErrorModel('博客删除失败！');
    }
  }
};

module.exports = handleBlogRouter;
