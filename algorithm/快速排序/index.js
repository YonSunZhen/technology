// 思路过程：
// 首先设定一个分界值 通过该分界值将数组分成左右两部分
// 将大于或等于分界值的数据集中到数组右边 小于分界值的数据集中到数组的左边 此时 左边部分中各元素都小于或等于分界值 而右边部分中各元素都大于或等于分界值
// 然后 左边和右边的数据可以独立排序 对于左侧的数组数据 又可以取一个分界值 将该部分数据分成左右两部分 同样在左边放置较小值 右边放置较大值 右侧的数组数据也可以做类似处理
// 重复以上过程 可以看出 这是一个递归定义 通过递归将左侧部分排好序后 再递归排好右侧部分的顺序
// 当左右两个部分各数据排序完成后 整个数组的排序也就完成了

// 时间复杂度：有点难

/**
 * 快速排序
 * @param arr 要排序的集
 */
function quickSort(arr) {
  const res = [...arr];
  const recurseFn = (recurseArr, start, end) => {
    const _arr = recurseArr;
    if(_arr.length > 1) {
      const pivot = _arr[start];
      let low = start;
      let high = end;
      while(low < high) {
        while(recurseArr[high] >= pivot && low < high) {
          high--;
        }
        while(recurseArr[low] <= pivot && low < high) {
          low++;
        }
        if(low < high) {
          [recurseArr[low], recurseArr[high]] = [recurseArr[high], recurseArr[low]];
        } else {
          [recurseArr[start], recurseArr[high]] = [recurseArr[high], recurseArr[start]];
        }
      }
      high - start > 1 && recurseFn(_arr, start, high-1);
      end - high > 1 && recurseFn(_arr, high+1, end);
    }
  }
  recurseFn(res, 0, res.length - 1);
  return res;
}
const arr = [5, 2, 12, 2, 134, 1, 3, 34, 4, 6, 1, 3, 4];
const test = quickSort(arr);
console.log(test);