async function myForEach(arr, callback) {
  let T, k;
  if(arr === null) {
    throw new TypeError('this is null or not defined');
  }
  // 用于处理若传入的arr为非数组的情况(string等)
  const O = Object(arr); 
  // 无符号右移：将十进制转化为二进制 右移
  // 作用：所有非数值转换成0；所有大于等于 0 等数取整数部分
  // 1 >>> 0 // 1
  // undefined >>> 0 // 0
  // null >>> 0 // 0
  // 'string' >>> 0 // 0
  const len = O.length >>> 0;
  if(typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  if(arguments.length > 1) {
    T = callback;
  }
  k = 0;
  while (k < len) {
    // 如果指定的属性在指定的对象或其原型链中，则in运算符返回true
    // 用于过滤未初始化的值
    if(k in O) {
      const kValue = O[k];
      // kValue, k, O 对应着forEach回调函数3个参数, 数组当前项的值 数组当前项的索引 数组对象本身
      // call：将callbak的this指向其自己的内部
      console.log('这里是调试3');
      await callback.call(T, kValue, k, O);
    }
    k++;
  }
  return undefined;
}

const test = [1,2,,3];
function getData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('这里是调试1');
      res(2);
    }, 500)
  })
}
myForEach(test, async (item) => {
  const data = await getData();
  console.log('这里是调试2');
  console.log(data);
})



const test = [1,2,3];
test.forEach(element => {
  if(element === 3) {
    continue;
  }
  console.log(element);
});

const test = [1,2,3];
for(let i = 0; i < test.length; i++) {
  const element = test[i];
  if(element === 2) {
    continue;
  }
  console.log(element);
}

// 在回调函数中修改源数组在遍历数组时会影响值的输出（内部使用浅拷贝）
const arr = [1,2,3];
arr.forEach((a, i) => {
  if(i === 0) {
    arr[1] = 20;
  };
  console.log(a);
})
