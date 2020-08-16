const { sqlHandle } = require('../db/mysql');

const getListData = (keyword, author) => {
  let sql = `select * from blogs where 1=1 `;
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  if (author) {
    sql += `and author = '${author}' `;
  }
  sql += `order by createtime DESC`;
  return sqlHandle(sql);
};

const getDetailData = (id) => {
  /* return {
    id: 2,
    title: '博客2',
    content: '内容2',
    createTime: 1597241991773,
    author: 'lisi',
  }; */
  const sql = `select * from blogs where id=${id}`;
  return sqlHandle(sql);
};

const newBlog = (blogData = {}) => {
  console.log('newBlog...', blogData);
  return {
    id: 1,
  };
};

const updateBlog = (id, blogData = {}) => {
  console.log('updateBlog...', id, blogData);
  return true;
};

const deleteBlog = (id) => {
  console.log('deleteBlog...', id);
  return true;
};

module.exports = {
  getListData,
  getDetailData,
  newBlog,
  updateBlog,
  deleteBlog,
};
