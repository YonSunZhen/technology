// 迭代器
// 一种特殊对象
// 为迭代过程设计的专有接口
// 调用返回一个结果对象 对象中有next()方法 
// next()方法返回一个对象 一个value:表示下一个要返回的值; 一个done:但没有更多可以返回的数据时返回true

function createIterator(items) {
  let i = 0;
  return {
    next: function() {
      let done = (i >= items.length);
      // items[i++] 相当于 items[i]; i++;
      let value = !done ? items[i++] : undefined;
      return {
        value: value, // 
        done: done // true表示后面没有值了
      };
    }
  };
}
// 只创建了一个实例 因此i一直是同一个
let iterator = createIterator([1,2,3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }