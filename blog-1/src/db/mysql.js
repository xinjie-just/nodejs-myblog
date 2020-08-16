const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

const con = mysql.createConnection(MYSQL_CONF);

// 链接数据库
con.connect();

// 操作数据库
const sqlHandle = (sql) => {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
  return promise;
};

module.exports = {
  sqlHandle,
};
