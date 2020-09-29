import { Injectable } from '../di';

// Injectable(...) 之后并未真正的将Service注入依赖容器 只是给此Service添加了一个元数据
@Injectable()
export class ChildService {

  constructor() {

  }
}