// 回文
// 动态规划
function longestPalindrome(s) {
  if(s.length === 0) {
    return "";
  }
  let reverseStr = s.split("").reverse().join("");
  let result = s[0]; // 字符串切记初始化 不然为undefined
  for(let i = 0; i < s.length; i++) {  
    let str = s[i];
    for(let j = i + 1; j < s.length; j++) {
      str += s[j];
      // 验证正序和反序是否一样
      let _reverseStr = reverseStr.slice(i, j+1);
      console.log(_reverseStr);
      
      // 这里也有n 因此空间复杂度是n的3次方
      if(str === _reverseStr) {
        if(str.length > result.length) {
          result = str;
        }
      }
    }
  }
  return result;
}
let s = 'abb';
console.log(longestPalindrome(s));