const { genPassword } = require('../utils/cryp');
const { sqlHandle, escape } = require('../db/mysql');

const login = (username, password) => {
  username = escape(username);
  // 密码加密
  password = genPassword(password);
  password = escape(password);
  const sql = `select username, realname from users where username=${username} and password=${password}`;
  // console.log('sql is', sql);
  return sqlHandle(sql).then((row) => {
    return row[0];
  });
};

module.exports = { login };
