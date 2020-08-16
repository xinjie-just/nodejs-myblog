const http = require('http');

const serverHandle = require('../app');

const PORT = 4010;

const server = http.createServer(serverHandle);

server.listen(PORT);

console.log(`server run on http://localhost:${PORT}`);
