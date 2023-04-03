/*
 * @Author: yongzhen.sun
 * @Date: 2023-03-23 09:39:19
 * @LastEditors: yongzhen.sun
 * @LastEditTime: 2023-04-03 17:19:50
 * @Description: file content
 */
const data = [
  {
    id: 1,
    label: '一级 1',
    children: [{
      id: 4,
      label: '二级 1-1',
      children: [{
        id: 9,
        label: '三级 1-1-1'
      }, {
        id: 10,
        label: '三级 1-1-2'
      }]
    }]
  }, 
  {
    id: 2,
    label: '一级 2',
    children: [{
      id: 5,
      label: '二级 2-1'
    },{
      id: 6,
      label: '二级 2-2'
    }]
  }, 
  {
    id: 3,
    label: '一级 3',
    children: [{
      id: 7,
      label: '二级 3-1'
    }, {
      id: 8,
      label: '二级 3-2'
    }]
  }
]

// 获取指定节点的所有祖先
// function getParentlist(code, tree) {
// 	let arr = [] //要返回的数组
// 	for (let i = 0; i < tree.length; i++) {
// 		let item = tree[i]
// 		arr = []
// 		arr.push(item.id) //保存当前节点id
// 		if (code == item.id) { //判断当前id是否是默认id
// 			return arr //是则退出循环、返回数据
// 		} else { //否则进入下面判断，判断当前节点是否有子节点数据
// 			if (item.children && item.children.length > 0) {
//         //合并子节点返回的数据
// 				arr = arr.concat(this.getParentlist(code, item.children)) 
// 				if (arr.includes(code)) { //如果当前数据中已包含默认节点，则退出循环、返回数据
// 					return arr
// 				}
// 			}
// 		}
// 	}
// }
 
// console.log(getParentlist(10, data))


// 获取指定节点的所有子孙
function getChildNode(code, tree) {
  let node = [code]
  const recurseFn = (data = []) => {
    for(const item of data) {
      if(item.id === code) {
        node.push(...flatTreeData(item.children))
        break
      }
      item?.children && recurseFn(item.children)

    }
  }
  recurseFn(tree)
  return node
}

function flatTreeData(tree) {
  const res = []
  const recurseFn = (data = []) => {
    for(const item of data) {
      res.push(item.id)
      item?.children && recurseFn(item.children)
    }
  }
  recurseFn(tree)
  return res
}

console.log(getChildNode(2, data))