const fs = require('fs');
const path = require('path');

const writeLogs = (log) => {
  const logFilePath = path.join(__dirname, '../', '../', 'logs/access.log');
  const writeStream = fs.createWriteStream(logFilePath, {
    flags: 'a',
  });
  writeStream.write(log + '\n');
};

module.exports = {
  writeLogs,
};
