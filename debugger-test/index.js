/* console.log(100);
console.log(200);
console.log(300);
console.log(400);
console.log(500);
console.log(600);
console.log(700); */

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end('<h1>Hello World!</h1>');
});

server.listen(3001, () => {
  console.log('listenning on 3001.');
});
