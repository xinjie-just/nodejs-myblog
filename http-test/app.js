const http = require('http');
/* const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log('method: ', req.method);
  console.log('url: ', req.url);
  const query = querystring.parse(req.url.split('?')[1]);
  console.log('query: ', query);
  res.end(JSON.stringify(query));
}); */

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    console.log('content-type: ', req.headers['content-type']);
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      res.end('reviced.');
      console.log('postData: ', postData);
    });
  }
});

server.listen(3003);
console.log('ok');
