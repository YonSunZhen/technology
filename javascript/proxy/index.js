/*
 * @Author: yongzhen.sun
 * @Date: 2023-01-29 14:04:26
 * @LastEditors: yongzhen.sun
 * @LastEditTime: 2023-01-29 14:54:18
 * @Description: file content
 */
// Proxy 用于创建一个对象的代理，从而实现基本操作的拦截和定义（如属性查找，赋值，枚举，函数调用等）

// 基础示例
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : 37
  }
}
const p = new Proxy({}, handler)
p.a = 1
p.b = undefined
console.log(p.a, p.b);
console.log('c' in p, p.c);

// 无操作转发代理
let target = {}
let p = new Proxy(target, {})
p.a = 37 // 操作转发到目标
console.log(target.a);

// 验证
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }
    obj[prop] = value
    return true
  }
}
let person = new Proxy({}, validator)
person.age = 100
console.log(person.age)
person.age = 'young'