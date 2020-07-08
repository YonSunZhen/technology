const INSERT_RECUSIVE = Symbol('BST#recursiveInsert');
const SEARCH_RECUSIVE = Symbol('BST#recursiveSearch');
const haha = Symbol('haha');
// 默认返回构造函数中的数据?
class BST {
  constructor() {
    this.root = null;
    this.count = 0;
    this.Node = function(value) {
      return {
        value,
        count: 1,
        left: null,
        right: null
      }
    }
  }

  insert(value) {
    this.root = this[INSERT_RECUSIVE](this.root, value);
  }

  search(value) {
    
  }

  // 主要目的为实现私有化，仅类内部调用，类似于 Private 声明 ???
  [INSERT_RECUSIVE](node, value) {
    // 如果当前节点为空，创建一个新节点（递归到底）
    if (node === null) {
      this.count++; // 节点数加 1
      return new this.Node(value);
    }
    // 节点数不变，说明要更新的值等于二叉树中的某个节点值
    if (value === node.value) {
        node.count++; // 节点数加 1
    } else if (value < node.value) { // 新插入子节点在二叉树左边，继续递归插入
        node.left = this[INSERT_RECUSIVE](node.left, value);
    } else if (value > node.value) {
        node.right = this[INSERT_RECUSIVE](node.right, value);
    }
    return node;
  }

}

const bST = new BST();
bST.insert(30);
bST.insert(25);
bST.insert(36);
bST.insert(20);
bST.insert(28);
bST.insert(32);
bST.insert(40);
console.log(bST);
