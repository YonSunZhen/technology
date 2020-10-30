Array.prototype.myReduce = function(callback, prev) {
  for(let i = 0; i < this.length; i++) {
    if(typeof prev === 'undefined') {
      prev = callback(this[i], this[i + 1], i + 1, this);
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
};

let r1 = [1, 2, 3, 4].myReduce(function (prevValue, currentValue, currentIndex, array) {
  return prevValue + currentValue;
}, 22);

console.log(r1);

let r2 = [1, 2, 3, 4].myReduce(function (prevValue, currentValue, currentIndex, array) {
  return prevValue + currentValue;
}, 22);

console.log(r2);