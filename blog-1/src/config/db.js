const env = process.env.NODE_ENV;
console.log('env', env);

let MYSQL_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Lxj18227752005',
    port: 3306,
    database: 'myblog',
  };
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Lxj18227752005',
    port: 3306,
    database: 'myblog',
  };
}

module.exports = {
  MYSQL_CONF,
};
