const { genPassword } = require('../utils/cryp');
const { sqlHandle, escape } = require('../db/mysql');

const login = async (username, password) => {
  username = escape(username);
  // 密码加密
  password = genPassword(password);
  password = escape(password);
  const sql = `select username, realname from users where username=${username} and password=${password}`;
  // console.log('sql is', sql);
  const row = await sqlHandle(sql);
  return { results: row[0] };
};

module.exports = { login };
