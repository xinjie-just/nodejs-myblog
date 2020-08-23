const { sqlHandle } = require('../db/mysql');

const login = (username, password) => {
  /* if (username === 'zhangsan' && password === '123') {
    return true;
  }
  return false; */
  const sql = `select username, realname from users where username='${username}' and password='${password}'`;
  return sqlHandle(sql).then((row) => {
    return row[0];
  });
};

module.exports = { login };
