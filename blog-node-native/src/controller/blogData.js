const xss = require('xss');
const { sqlHandle } = require('../db/mysql');

// 获取博客列表
const getBlogList = (keyword = '', author = '', pageIndex, pageSize) => {
  let totalSql = ``;
  let total = 0;
  let sql = `select * from blogs where 1=1 `;
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  if (author) {
    sql += `and author = '${author}' `;
  }
  sql += `order by createtime desc `;
  totalSql = sql;
  sqlHandle(totalSql).then((data) => {
    total = data.length;
  });

  if (pageIndex && pageSize) {
    const index = pageIndex * pageSize;
    sql += `limit ${index}, ${pageSize}`;
  }
  return sqlHandle(sql).then((data) => {
    return {
      total,
      results: data,
    };
  });
};

// 获取博客详情
const getBlogDetail = (id) => {
  const sql = `select * from blogs where id=${id}`;
  return sqlHandle(sql).then((row) => {
    return {
      results: row[0],
    };
  });
};

// 新建一个博客
const createBlog = (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createtime = Date.now();
  const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createtime})`;
  return sqlHandle(sql).then((data) => {
    return {
      results: data.insertId,
    };
  });
};

// 更新博客内容
const updateBlog = (id, blogData = {}) => {
  const author = blogData.author;
  const title = xss(blogData.title);
  const content = xss(blogData.content);
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
    return {
      results: data.affectedRows !== 0 ? true : false,
    };
  });
};

// 删除一条博客
const deleteBlog = (id, author) => {
  // 加上 author，自己的博客只能自己删除，避免别人直接通过 id 来删除。
  // const sql = `update blogs set status = 0 where id = ${id} and author='${author}'`;
  const sql = `delete from blogs where id = ${id} and author='${author}'`;
  return sqlHandle(sql).then((data) => {
    return {
      results: data.affectedRows !== 0 ? true : false,
    };
  });
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
