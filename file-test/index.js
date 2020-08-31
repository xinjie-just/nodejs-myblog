const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'test.txt');

/* // 读取文件
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log('Error ', err);
    return;
  }
  console.log(data.toString());
}); */

/* // 写文件
const content = '这是新写入的内容\n';
const writeWay = {
  flag: 'a', // 追加, 重写('w')
};
fs.writeFile(fileName, content, writeWay, (err) => {
  if (err) {
    console.log('Error ', err);
  }
}); */

// 判断文件是否存在
fs.exists(fileName, (exists) => {
  console.log(exists ? '文件存在！' : '文件不存在！');
});
