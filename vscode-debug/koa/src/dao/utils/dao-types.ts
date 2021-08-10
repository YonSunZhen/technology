/**
 * model: 精确查询
 * modelLike: 模糊查询
 * modelIn: in 查询
 */
export interface DaoType<Model = any> {
  pageNo?: number;
  pageSize?: number;
  model?: Model;
  modelLike?: {
    [P in keyof Model]?: Model[P];
  };
  modelIn?: {
    [P in keyof Model]?: Array<Model[P]>;
  };
}