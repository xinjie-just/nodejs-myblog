const { sqlHandle } = require('../db/mysql');

// 获取博客列表
const getBlogList = (keyword = '', author = '') => {
  let sql = `select * from blogs where 1=1 `;
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  if (author) {
    sql += `and author = '${author}' `;
  }
  sql += `order by createtime desc`;
  return sqlHandle(sql).then((data) => {
    console.log('blogListData...', data);
    return data;
  });
};

// 获取博客详情
const getBlogDetail = (id) => {
  /* return {
    id: 2,
    title: '博客2',
    content: '内容2',
    createTime: 1597241991773,
    author: 'lisi',
  }; */
  const sql = `select * from blogs where id=${id}`;
  return sqlHandle(sql).then((row) => {
    return row[0];
  });
};

// 新建一个博客
const createBlog = (blogData = {}) => {
  /* console.log('createBlog...', blogData);
  return {
    id: 1,
  }; */
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();
  const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createtime})`;
  return sqlHandle(sql).then((data) => {
    // console.log('blogs insert...', data);
    return data.insertId;
  });
};

// 更新博客内容
const updateBlog = (id, blogData = {}) => {
  /* console.log('updateBlog...', id, blogData);
  return true; */
  const author = blogData.author;
  const title = blogData.title;
  const content = blogData.content;
  const createtime = Date.now();
  let sql = `update blogs set createtime=${createtime}`;
  if (author) {
    sql += `,author='${author}'`;
  }
  if (title) {
    sql += `,title='${title}'`;
  }
  if (content) {
    sql += `,content='${content}'`;
  }
  sql += ` where id=${id}`;
  return sqlHandle(sql).then((data) => {
    // console.log('updateBlog...', id, data);
    return data.affectedRows !== 0 ? true : false;
  });
};

// 删除一条博客
const deleteBlog = (id, author) => {
  /* console.log('deleteBlog...', id);
  return true; */
  // 加上 author，自己的博客只能自己删除，避免别人直接通过 id 来删除。
  // const sql = `update blogs set status = 0 where id = ${id} and author='${author}'`;
  const sql = `delete from blogs where id = ${id} and author='${author}'`;
  return sqlHandle(sql).then((data) => {
    console.log('deleteBlog...', id, data);
    return data.affectedRows !== 0 ? true : false;
  });
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
