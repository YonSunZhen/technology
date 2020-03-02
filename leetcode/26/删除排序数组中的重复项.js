// 给定一个排序数组 在原地删除重复出现的元素 使得每个元素只出现一次 返回移除后的数组的新长度
// 不使用额外的数组空间 在原地修改数组并在使用O(1)额外空间的条件下完成
// 一个指针负责掌握前面已经不重复的元素的索引
// 后者负责遍历所有元素
// 不需要返回数组 不能对原数组进行删除操作 只要返回数组的长度即可
function removeDuplicates(nums) {
  let i = 0;
  let j = 1;
  for(j = 1; j < nums.length; j++) {
    if(nums[i] !== nums[j]) {
      i++;
    }
  }
  return i + 1;
}

const test = [0,0,1,1,1,2,2,3,3,4];
const data = removeDuplicates(test);
console.log(data);
