const crypto = require('crypto');

// 密钥
const SECRET_KEY = 'lxj_love_gxq';

// md5 加密
const md5Secret = (content) => {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
};

// 加密函数
const genPassword = (password) => {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5Secret(str);
};

// console.log('加密密码:', genPassword(456));

module.exports = {
  genPassword,
};
