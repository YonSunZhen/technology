function quickSort(arr, left, right) {
  left = typeof left === 'number' ? left : 0
  right = typeof right === 'number' ? right : arr.length - 1
  const pivot = left // 支点
  if(left < right) {
    let index = pivot + 1
    for(let i = pivot + 1; i <= right; i++) {
      if(arr[i] < arr[pivot]) {
        [arr[i], arr[index]] = [arr[index], arr[i]]
        index++
      } 
    }
    const partitionIdx = index - 1; // 分割点
    [arr[pivot], arr[partitionIdx]] = [arr[partitionIdx] ,arr[pivot]]
    // 左边递归
    quickSort(arr, left, partitionIdx-1)
    // 右边递归
    quickSort(arr, partitionIdx + 1, right)
  }
}

const arr = [5, 2, 12, 2, 134, 1, 3, 34, 4, 6, 1, 3, 4];
quickSort(arr)
console.log(arr);