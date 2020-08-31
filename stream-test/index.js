/* // 标准输入输出
process.stdin.pipe(process.stdout); */

/* // http 请求，请求参数和响应参数
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(res);
  }
});
server.listen(9000); */

/* // 复制文件
const fs = require('fs');
const path = require('path');

const filePath1 = path.resolve(__dirname, 'test.txt');
const filePath2 = path.resolve(__dirname, 'test-bak.txt');
const readStream = fs.createReadStream(filePath1);
const writeStream = fs.createWriteStream(filePath2);
readStream.pipe(writeStream);

readStream.on('data', (chunk) => {
  console.log('chunk ', chunk.toString());
});

readStream.on('end', () => {
  console.log('stream done!');
}); */

// 文件 I/O 和网络 I/O 操作 stream
const http = require('http');
const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, 'test.txt');
const server = http.createServer((req, res) => {
  if ((req.method = 'GET')) {
    const readStream = fs.createReadStream(filePath);
    res.setHeader('Content-type', 'text/html;charset=utf8'); // 设置编码格式，避免中文乱码
    readStream.pipe(res);
  }
});
server.listen(9001);
console.log(`server run on http://localhost:9001`);
