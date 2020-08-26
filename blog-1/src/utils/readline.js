const fs = require('fs');
const path = require('path');
const readline = require('readline');

// access.log 文件路径
const filePath = path.join(__dirname, '../', '../', 'logs', 'access.log');

// 可读流 read Stream
const readStream = fs.createReadStream(filePath);

// 创建一个新的 readline.Interface 实例
const rl = readline.createInterface({ input: readStream });

let [lineCount, chromeLineCount] = [0, 0];

// 逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  // 总行数累加
  lineCount++;
  // Chrome 浏览器行数
  const logLineArr = lineData.split(' -- ');
  if (logLineArr[2] && logLineArr[2].includes('Chrome')) {
    chromeLineCount++;
  }
});

// 逐行读取完成
rl.on('close', () => {
  console.log(
    '使用 Chrome 浏览器发起 HTTP 请求占所有浏览器比：',
    `${((chromeLineCount / lineCount) * 100).toFixed(2)}%`
  );
});
