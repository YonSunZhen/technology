// 当待搜索的集合是相对静态的有序数据集时，此时使用二分查找是最好的选择。
// 复杂度: O(lgn), n为要查找的元素个数。
// 思路过程: 通过变量left和right控制一个循环来查找元素(其中left和right是正在查找的数据集的两个边界值)。
// 首先,将left和right分别设置为0和length-1.在循环的每次迭代过程中,将middle设置为left和right之间区域的中间值。
// 如果处于middle的元素比目标值小,将左索引值(left)移动到middle后一个元素的位置上,即下一组要搜索的区域为当前数据的下半区。
// 如果处于middle的元素比目标值大,将右索引值(right)移动到middle前一个元素的位置上,即下一组要搜索的区域为当前数据的上半区。
// 直到left和right重合即可停止搜索。
// 关键点: 由于要搜索的数组集长度是奇数还是偶数是不确定的,因此采用Math.floor方法进行处理(返回小于等于某个数的最大整数)。

/**
 * @param arr 要搜索的数组集
 * @param target 搜索的值
 * @return 若存在就返回该值在数组中的下标,若不存在就返回-1
 */
function binarySearch(arr, target) {
  let length = arr.length;
  let left = 0;
  let right = length - 1;
  while(left <= right) {
    let middleIndex = Math.floor((right + left) / 2);
    let middle = arr[middleIndex];
    if(target > middle) {
      left = middleIndex + 1;
    } else if(target < middle) {
      right = middleIndex - 1;
    } else{
      return middleIndex;
    }
  }
  return -1;
}
let test = [1,5,6,7];
console.log(binarySearch(test, 5));