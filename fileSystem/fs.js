const fs = require('fs');
const path = require('path');

/* fs.rename('aaa.json', 'a.json', (err) => {
  if (err) {
    throw err;
  }
  console.log('重命名完成');
}); */
/* fs.stat('a.json', (err, stats) => {
  if (err) throw err;
  console.log('文件属性: ', stats);
}); */

/* fs.open('a.json', 'r', (err, fd) => {
  if (err) throw err;
  fs.close(fd, (err) => {
    if (err) throw err;
    console.log(fd);
  });
  console.log(fd);
}); */

const fileName = path.resolve(__dirname, 'file', 'file.json');
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});
