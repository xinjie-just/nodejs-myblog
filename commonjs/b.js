const { add, mul } = require('./a');
const _ = require('lodash');

console.log(add(20, 10));
console.log(mul(20, 10));

const arr = _.concat(3, [4, 5]);
console.log(arr);
