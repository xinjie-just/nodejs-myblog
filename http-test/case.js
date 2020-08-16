const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json');
  const method = req.method;
  const url = req.url;
  const pathname = req.url.split('?')[0];
  const query = querystring.parse(req.url.split('?')[1]);
  let resData = {
    method,
    url,
    pathname,
    query,
  };
  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  }
  if (method === 'POST') {
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      Object.assign(resData, { postData });
      res.end(JSON.stringify(resData));
    });
  }
});

server.listen(3015);
console.log('ok');
