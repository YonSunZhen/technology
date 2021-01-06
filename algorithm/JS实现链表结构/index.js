
// 生成一个符合链表结构的对象(非连续的线性表)
function Node(element) {
  this.element = element; // 当前节点元素
  this.next = null; // 下一个节点链接
}

function LinkedList() {
  this.head = new Node('head');
}
// 查找节点
LinkedList.prototype.find = function(item) {
  let currNode = this.head;
  while(currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}
// 插入节点
LinkedList.prototype.insert = function(newElement, item) {
  let newNode = new Node(newElement);
  let currNode = this.find(item);
  newNode.next = currNode.next;
  currNode.next = newNode;
}
// 显示链表
LinkedList.prototype.display = function() {
  let currNode = this.head;
  while(!(currNode.next == null)) {
    console.log(currNode.next.element);
    currNode = currNode.next;
  }
}
// 删除节点(先找到要删除节点的位置,再改变指向即可)
LinkedList.prototype.remove = function(item) {
  let currNode = this.head;
  // 找到要删除节点的前一个节点
  while(!(currNode.next == null) && (currNode.next.element != item)) {
    currNode = currNode.next;
  }
  if(!(currNode.next == null)) {
    currNode.next = currNode.next.next;
  }
}
let test = new LinkedList();
test.insert('Apple', 'head');
test.insert('Banana', 'Apple');
test.insert('Pear', 'Banana');
console.log(test);
// test.remove('Apple');
// console.log(test);
