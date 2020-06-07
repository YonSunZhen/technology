function mySplice(arr, start, deleteCount, ...item) {
  // 1、Let O be the result of calling ToObject passing the this value as the argument.
  const O = arr;
  // 2、Let A be a new array created as if by the expression new Array()where Array is the standard built-in constructor with that name.
  const A = new Array();
  // 3、Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
  const lenVal = O.length;
  // 4、Let len be ToUint32(lenVal).
  const len = lenVal >>> 0;
  // 5、Let relativeStart be ToInteger(start).
  const relativeStart = Number(start);
  // 6、If relativeStart is negative, let actualStart be max((len + relativeStart),0); else let actualStart be min(relativeStart, len).
  const actualStart = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // 当start为负数是 从右边算起 最右边为-1
  // 7、Let actualDeleteCount be min(max(ToInteger(deleteCount),0), len – actualStart).
  const actualDeleteCount = Math.min(Math.max(Number(deleteCount), 0), len - actualStart); // 删除的个数不能超过后面数组剩余的个数
  // 8、Let k be 0.
  let k = 0;
  // 9、Repeat, while k < actualDeleteCount  将所有删除的元素添加到一个新的数组中 最后将其返回
  // a：Let from be ToString(actualStart+k).
  // b: Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
  // c: If fromPresent is true, then
  // i: Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
  // ii: Call the [[DefineOwnProperty]] internal method of A with arguments ToString(k), Property Descriptor {[[Value]]: fromValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false. 为什么要用这种 与普通的push有什么区别
  // d: Increment k by 1.
  while(k < actualDeleteCount) {
    const from = String(actualStart + k);
    if(from in O) {
      const fromValue = O[Number(from)];
      A.push(fromValue);
    }
    k++;
  }
  // 10、Let items be an internal List whose elements are, in left to right order, the portion of the actual argument list starting with item1. The list will be empty if no such items are present.
  let items = [];
  // ???截取对象中的某段数据添加到数组中
  if(item.length > 0) {
    items = item;
  }
  // 11、Let itemCount be the number of elements in items.
  const itemCount  = items.length;
  // 12、If itemCount < actualDeleteCount, then

  // 13、Else if itemCount > actualDeleteCount, then
}