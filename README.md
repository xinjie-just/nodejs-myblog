# 通过博客系统学习 Node.js

## 一、项目结构

├── README.md
├── blog // 基于 Angular9, ng-zorro-antd 的前端博客项目
│ ├── README.md
│ ├── angular.json
│ ├── browserslist
│ ├── dist
│ ├── e2e
│ ├── karma.conf.js
│ ├── package-lock.json
│ ├── package.json
│ ├── proxy.conf.json
│ ├── src
│ ├── tsconfig.app.json
│ ├── tsconfig.json
│ ├── tsconfig.spec.json
│ └── tslint.json
├── blog-express // 基于 express 的 Node.js Web Server 博客项目
│ ├── app.js
│ ├── bin
│ ├── config
│ ├── controller
│ ├── db
│ ├── logs
│ ├── middleware
│ ├── model
│ ├── package-lock.json
│ ├── package.json
│ ├── public
│ ├── routes
│ ├── utils
│ └── views
├── blog-koa2 // 基于 koa2 的 Node.js Web Server 博客项目
│ ├── app.js
│ ├── bin
│ ├── config
│ ├── controller
│ ├── db
│ ├── logs
│ ├── middleware
│ ├── model
│ ├── package-lock.json
│ ├── package.json
│ ├── public
│ ├── routes
│ ├── utils
│ └── views
├── blog-node-native // 原生 的 Node.js Web Server 博客项目
│ ├── app.js
│ ├── bin
│ ├── logs
│ ├── package-lock.json
│ ├── package.json
│ └── src
├── commonjs // 练习 commonjs
│ ├── a.js
│ ├── b.js
│ ├── package-lock.json
│ └── package.json
├── debugger-test // 练习 debugger 调试
│ ├── index.js
│ └── package.json
├── express-test // 练习 express
│ ├── app.js
│ ├── package-lock.json
│ └── package.json
├── file-test // 练习 Node.js 文件系统
│ ├── index.js
│ └── test.txt
├── fileSystem // 练习 Node.js 文件系统
│ ├── a.json
│ ├── b.json
│ ├── c.json
│ ├── file
│ └── fs.js
├── handleSql.sql // 练习 sql 语句
├── html-test // 基于 jQuery 的前端博客项目
│ ├── admin.html
│ ├── detail.html
│ ├── edit.html
│ ├── index.html
│ ├── login.html
│ └── new.html
├── http-test // 练习 Node.js http 模块
│ ├── app.js
│ ├── case.js
│ └── package.json
├── koa-demos // koa 练习
│ ├── Dockerfile
│ ├── README.md
│ ├── demos
│ ├── logo.png
│ ├── package-lock.json
│ └── package.json
├── pages // 前端页面截屏
│ ├── images
│ └── pages.md
├── pm2-test // 进程管理工具 PM2
│ ├── app.js
│ ├── logs
│ ├── package-lock.json
│ ├── package.json
│ └── pm2.conf.json
├── stream-test // Node.js 流系统
│ ├── article.txt
│ ├── index.js
│ ├── test-bak.txt
│ └── test.txt
├── test-mysql // 练习 mysql 操作
│ ├── index.js
│ ├── package-lock.json
│ └── package.json
└── test-redis
├── index.js
├── package-lock.json
└── package.json

## 二、添加用户

数据库配置如下：

```
MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Lxj18227752005',
    port: 3306,
    database: 'myblog',
};
```

数据库里面新增一个用户(初始指定一个用户，如：zhangsan/123）

```
use myblog;
inseart into users (username, password, realname) values ("zhangshan", "123", "张三");
```

## 三、启动后端项目

1. 启动 redis

在终端上执行 `redis-server` 启动 redis 服务，在另一个终端执行 `redis-cli` 上启动 redis 客户端。

2. 安装依赖

重新打开一个终端，进入 blog-node-native，安装依赖。

```
cd blog-node-native
npm install
```

3. 修改启动地址

进入 /bin/wwwjs，修改地址为 localhos:8000 ，使得后端服务运行在 localhos:8000 上。

4. 启动

在项目根目录下执行命令使用 nodemon 自动重启项目，`npm run dev`

## 四、 启动前端项目

1. 安装依赖

进入 blog 目录，安装依赖。

```
cd blog
npm install
```

2. 代理到后段服务器

在根目录下添加文件 `proxy.conf.json` 写如如下代码：

```
{
  "/api": {
    "target": "http://localhost:8000/api",
    "secure": false,
    "logLevel": "debug"
  }
}
```

以上代码表示：

> - 当 API 以 '/api' 开头时，使用 `http://localhost:8000/api` （后段服务部署在`http://localhost:8000` 下）替换
> - 并且是不安全的模式
> - 每次请求都会在控制台打印日志，显示请求地址（angular9 以上适用）

3. 启动

`npm run start` 启动，然后工程将运行在 localhost：4200 上。在浏览器中输入 `http://localhost:4200` 查看项目，登录后可以管理博客（增删改查）。
