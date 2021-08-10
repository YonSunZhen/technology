interface DataInfo {
  no?: string;
  parent_no?: string;
}
/**
 * 生成树的数据结构
 */
interface TreeInfo {
  data: DataInfo;
  children: Array<any>;
}
export class Tree {
  /**
   * @param rootNo 根节点编号标识 如 '0'||'root'
   * @param no 节点编号标识 如 'no'
   * @param parentNo 节点的父节点编号标识 如 'parent_no'
   */
  constructor(private rootNo: string, private no: string, private parentNo: string) {
    this.rootNo = rootNo;
    this.no = no;
    this.parentNo = parentNo;
  }

  /**
   * 数组生成树结构数据
   * @param data 
   */
  generateTree(data: Array<any>): TreeInfo {
    let result: TreeInfo;
    for (let i = 0; i < data.length; i++) {
      if (data[i][this.no] === this.rootNo) {
        const item = {
          data: data[i],
          children: []
        };
        this.generateChildTree(data, data[i][this.no], item);
        result = item;
      }
    }
    return result;
  }

  generateChildTree(data, parent_no, parentItem) {
    // 这里操作data只是针对这个函数中的data变量,之前函数中的data变量并未改变,保存在内存中 后面再改进
    data = data.filter((item) => {
      return (item[this.no] !== parent_no);
    });
    parentItem.children = parentItem.children ? parentItem.children : [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][this.parentNo] === parent_no) {
        const itemTemp = {
          data: data[i]
        };
        parentItem.children.push(itemTemp);
        // 就当前节点继续往下面找, 找到的话进, 没有的话children数组即为空           
        this.generateChildTree(data, data[i][this.no], itemTemp);
      }
    }
  }

  /**
   * 树结构生成数组数据||为每一项分配节点编号
   * @param treeData 原树结构数据
   * @param rootNo 根节点的新编号(如旧编号为1，100，100001；新编号为100，100001，100001001这种)有rootNo,为每项数据重新编号并打平 没有rootNo,只将没想数据打平
   * @param rootParentNo 根节点的父节点新编号
   * @param oldData 为保持生成no的唯一性 此数据为原来表中的残留数据 数组 空数组 undefined
   */
  generateTreeArray(treeData: TreeInfo, rootNo?: string, rootParentNo?: string, oldData?: Array<any>): Array<any> {
    rootParentNo = rootParentNo ? rootParentNo : null;
    const result: Array<any> = [];
    // 重新编号
    if (rootNo) {
      treeData.data.no = rootNo;
      treeData.data.parent_no = rootParentNo;
      result.push(treeData.data);
      recursGetTree(treeData.children, treeData.data.no, true, oldData);
      return result;
    }

    // 打平数据为数组 编号不变
    if (!rootNo) {
      result.push(treeData.data);
      recursGetTree(treeData.children, treeData.data.no, false);
      return result;
    }

    function recursGetTree(data: Array<any>, parent_no: string, isAgainNo: boolean, oldData?: Array<any>) {

      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          // true 重新编号 
          if (isAgainNo) {
            if (oldData) {
              // 遍历oldData 是否存在父编号等于parent_no的
              const noArray = [];
              let maxNo;
              oldData.forEach((item) => {
                // 需要改进 不要三等
                if (item.parent_no === parent_no) {
                  noArray.push(item.no);
                }
              });
              // 有残留数据
              if (noArray.length > 0) {
                maxNo = Math.max(...noArray);
                item.data.no = String(Number(maxNo) + 1);
              }
            } else {
              // 没有残留数据 按正常情况来
              if (parent_no.length < 3) {
                item.data.no = '100';
              } else {
                // 正常情况 生成的编号为父编号+001||002||003
                if (i < 9) {
                  item.data.no = parent_no + `00${i + 1}`;
                }
                if (i >= 9 && i < 99) {
                  item.data.no = parent_no + `0${i + 1}`;
                }
                if (i >= 99 && i < 999) {
                  item.data.no = parent_no + `${i + 1}`;
                }
              }
            }
            item.data.parent_no = parent_no;
            result.push(item.data);
            recursGetTree(item.children, item.data.no, true, oldData);
          } else {
            result.push(item.data);
            recursGetTree(item.children, item.data.no, false);
          }
        }
      }
    }

  }



  /**
   * 根据父级no生成其直接子级的最大编号
   * @param parent_no 
   * @param childArray 
   */
  getMaxNo(parent_no: string, childArray?: Array<any>): string {
    // 只有根节点没有其他任何节点的情况
    // if (parent_no === this.rootNo && (childArray.length === 0 || !childArray)) {
    //   return '100';
    // }
    
    if (childArray.length === 0 || !childArray) {
      return parent_no + '001';
    }
    let _maxNo = 0;
    // 数值超出了最大值的话比较会报错
    childArray.forEach(item => {
      const itemNo = item[this.no].toString();
      const _itemNo = itemNo.slice(itemNo.length - 3, itemNo.length); // 取出后三位
      if (Number(_itemNo) > Number(_maxNo)) {
        _maxNo = _itemNo;
      }
    });
    let res;
    const num = Number(_maxNo) + 1; // num可能1位/2位/3位
    if(num < 10) {
      res = `${parent_no}00${num}`;
    }
    if(num > 9 && num < 100) {
      res = `${parent_no}0${num}`;
    }
    if(num > 99 && num < 1000) {
      res = `${parent_no}${num}`;
    }  
    return res;
  }
}


