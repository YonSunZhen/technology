Array.prototype.myReduce1 = function(callback, prev) {
  for(let i = 0; i < this.length; i++) {
    if(typeof prev === 'undefined') {
      prev = callback(this[i], this[i + 1], i + 1, this);
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
};

let r1 = [1, 2, 3, 4].myReduce1(function (prevValue, currentValue, currentIndex, array) {
  return prevValue + currentValue;
}, 22);

console.log(r1);

let r2 = [1, 2, 3, 4].reduce(function (prevValue, currentValue, currentIndex, array) {
  return prevValue + currentValue;
}, 22);

console.log(r2);

Array.prototype.myReduce = function(callback, initialValue) {
  if(this === null) {
    throw new TypeError( 'Array.prototype.reduce called on null or undefined' );
  }
  if (typeof callback !== 'function') {
    throw new TypeError( callback + ' is not a function');
  }
  const O = Object(this);
  const lenValue = O.length;
  const len = lenValue >>> 0;
  if(len === 0 && !initialValue) {
    throw new TypeError('the array contains no elements and initialValue is not provided');
  }
  let k = 0;
  let accumulator;
  // 分成两种情况来获取accumulator
  // 有提供initialValue accumulator=initialValue
  // 没有提供initialValue accumulator=数组的第一个有效元素
  if(initialValue) {
    accumulator = initialValue;
  } else {
    let kPressent = false;
    while(!kPressent && k < len) {
      const pK = String(k);
      kPressent = O.hasOwnProperty(pK);
      if(kPressent) {
        accumulator = O[pK];
      };
      k++;
    }
    if(!kPressent) {
      throw new TypeError('the array contains error elements and initialValue is not provided');
    }
  }
  // 当accumulator=initialValue时 k=0
  // accumulator=数组的第一个有效元素时 k=1
  while(k < len) {
    if(k in O) {;
      accumulator = callback(accumulator, O[k], k, O);
    }
    k++;
  }
  return accumulator;
}

let r3 = [1,2,3].myReduce(function (prevValue, currentValue, currentIndex, array) {
  return prevValue + currentValue;
}, 22);

console.log(r3);

console.log([].concat([1,2]));

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
console.log(countedNames);