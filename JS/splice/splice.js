// 思路：
// 需要删除元素时：没有删除的元素往后移
// 添加的元素在最后一次加入
function mySplice(arr, start, deleteCount, ...item) {
  console.log(arr);
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
  //  i: Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
  //  ii: Call the [[DefineOwnProperty]] internal method of A with arguments ToString(k), Property Descriptor {[[Value]]: fromValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false. 为什么要用这种 与普通的push有什么区别
  // d: Increment k by 1.
  // 获取删除的数组
  while(k < actualDeleteCount) {
    const from = String(actualStart + k);
    // if(from in O) {
    //   const fromValue = O[Number(from)];
    //   A.push(fromValue);
    // }
    const fromPresent = O.hasOwnProperty(from);
    if(fromPresent) {
      const fromValue = O[from];
      Object.defineProperty(A, k, {
        Writable: true,
        Enumerable: true,
        Configurable: true,
        value: fromValue
      })
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
  // a: Let k be actualStart.
  // b: Repeat, while k < (len – actualDeleteCount)
  //  i: Let from be ToString(k+actualDeleteCount).
  //  ii: Let to be ToString(k+itemCount).
  //  iii: Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from. 将from作为参数传递给0的内建方法[[HasProperty]] 结果赋值给fromPresent
  //  iv: If fromPresent is true, then
  //    1、 Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
  //    2、 Call the [[Put]] internal method of O with arguments to, fromValue, and true.
  //  v:  Else, fromPresent is false
  //    1、 Call the [[Delete]] internal method of O with arguments to and true.
  //  vi: Increase k by 1.
  // c: Let k be len.
  // d: Repeat, while k > (len – actualDeleteCount + itemCount)
  //  i: Call the [[Delete]] internal method of O with arguments ToString(k–1) and true. 调用O内建的方法[[Delete]]来删除k-1位置上的元素
  //  ii: Decrease k by 1.
  // 添加的个数小于删除的个数 为什么要这么分？ 这时候原有的元素要往左移
  if(itemCount < actualDeleteCount) {
    let k = actualStart;
    while(k < (len - actualDeleteCount)) {
      const from = String(k + actualDeleteCount);
      const to = String(k + itemCount);
      const fromPresent = O.hasOwnProperty(from);
      if(fromPresent) {
        const fromValue = O[from];
        O[to] = fromValue;
        delete O[from];
      } else {
        // delete方法将某个位置上的值置为undefined
        delete O[to];
      }
      k++;
    }

  }
  // 13、Else if itemCount > actualDeleteCount, then
  // a: Let k be (len – actualDeleteCount).
  // b: Repeat, while k > actualStart
  //  i: Let from be ToString(k + actualDeleteCount – 1).
  //  ii: Let to be ToString(k + itemCount – 1)
  //  iii: Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
  //  iv: If fromPresent is true, then
  //    1、Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
  //    2、Call the [[Put]] internal method of O with arguments to, fromValue, and true.
  //  v: Else, fromPresent is false
  //    1、Call the [[Delete]] internal method of O with argument to and true.
  //  vi: Decrease k by 1.
  // 添加的个数大于删除的个数 为什么要这么分？ 这时候原有的元素要往右移
  // 移动元素时必须从数组最后一个开始移动 这样不会干扰到别的元素的移动
  if(itemCount > actualDeleteCount) {
    let k = len - actualDeleteCount;
    while(k > actualStart) {
      const from = String(k + actualDeleteCount - 1);
      const to = String(k + itemCount - 1);
      const fromPresent = O.hasOwnProperty(from);
      if(fromPresent) {
        const fromValue = O[from];
        O[to] = fromValue;
      } else {
        delete O[to];
      }
      k--;
    }
    // const num = len - actualStart - actualDeleteCount;
    // for(let i = 0; i < num; i++) {
    //   const from = len - 1 - i;
    //   const to = len + (itemCount - actualDeleteCount) - 1 - i;
    //   const fromPresent = O.hasOwnProperty(from); 
    //   if(fromPresent) {
    //     const fromValue = O[from];
    //     O[to] = fromValue;
    //   }
    // }
  }
  // 14、Let k be actualStart.
  let i = actualStart;
  // 15、Repeat, while items is not empty
  // a: Remove the first element from items and let E be the value of that element.
  // b: Call the [[Put]] internal method of O with arguments ToString(k), E, and true.
  // c: Increase k by 1.g
  // 按队列顺序插入数据
  while(items.length > 0) {
    const E = items.shift();
    O[String(i)] = E;
    i++;
  }
  // 16、Call the [[Put]] internal method of O with arguments "length", (len – actualDeleteCount + itemCount), and true.
  O['length'] = len - actualDeleteCount + itemCount;
  // 17、Return A.
  return A;
}

console.log('添加的个数大于删除的个数');
const testArr = [1,3,5,7];
const haha = mySplice(testArr, 4, 0, 33, 44, 55, 66);
console.log('这里是调试3');
console.log(testArr);
// console.log(haha);

// console.log('添加的个数小于删除的个数');
// const testArr1 = [1,3,5,7];
// const haha1 = mySplice(testArr1, 0, 3, 33, 44);
// console.log('这里是调试2');
// console.log(testArr1);
// console.log(haha1);



// const testArr = [1,3,5,7];
// testArr.splice(0, 0, 33);
// console.log(testArr);