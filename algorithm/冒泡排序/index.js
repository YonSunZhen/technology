
// 思路过程：遍历数组，前后两个值两两依次比较，当第一个值小于第二个值时，两个值交换位置
// 这样一轮比较下来，最大的值将会排在最后面，那么这个最大值就是已经排好序了，下一轮比较时将它排除
// 接着，进行第二轮，第三轮比较...（每一轮比较都会得出一个最大的值）。
// 按照以上的思路，假设要排序的有n个值，那就要进行n轮次的比较
// 接着在每一轮的比较中，第一轮要进行两两比较的次数为n-1，第二轮为n-2，以此类推...。

// 复杂度：O(n^2)，n为排序集的个数。
// 对于 n 位的数列则有比较次数为 (n-1) + (n-2) + ... + 1 = n * (n - 1) / 2，这就得到了最大的比较次数
// 举个例子来说，如果 n = 10000，那么 n(n-1) / 2 = (n^2 - n) / 2 = (100000000 - 10000) / 2
// 相对10^8来说，10000小的可以忽略不计了
// 所以总计算次数约为 0.5 * n^2。
// 用 O(n^2) 就表示了其数量级（忽略前面系数0.5）

/**
 * 冒泡排序
 * @param arr 要排序的集
 */
function bubbleSort(arr) {
  const res = [...arr];
  const arrLen = res.length;
  for(let i = 0; i < arrLen; i++) {
    for(let j = 0; j < arrLen - i - 1; j++) {
      const first = res[j];
      const second = res[j+1];
      if(first > second) {
        [res[j], res[j+1]] = [second, first];
      }
    }
  }
  return res;
}

const arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
const test = bubbleSort(arr);
console.log(test);