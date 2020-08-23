const mysql = require('mysql');

// 创建数据库连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lxj18227752005',
  port: 3306,
  database: 'myblog',
});

// 链接数据库
con.connect();

// 操作数据库
// const sql = 'select * from users';
// const sql = 'select id, username from users';
const sql = `insert into users (username, password, realname) values ('geqi', '123', '葛七')`;
// const sql = `update users set realname='王大五' where username='wangwu'`;
// const sql = `update users set realname='王五', status='0' where username='wangwu'`;
con.query(sql, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});

// 关闭数据库
con.end();
