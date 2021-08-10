import { db } from '../database/db';
import { service_logger } from '@common';
import { DemoType } from './demo-types';
import { DaoType } from '../utils/dao-types';
import { DataOptions, dbHelper } from '../database';

class Demo {

  TABLE_NAME;
  constructor() {
    this.TABLE_NAME = 'demo';
  }

  async ensure() {
    if (!await db.schema.hasTable(this.TABLE_NAME)) {
      service_logger.info(`create table '${this.TABLE_NAME}' now...`);
      await db.schema.createTable(this.TABLE_NAME, (t) => {
        t.charset('utf8mb4');
        t.increments('id').primary().notNullable().comment('id');
        t.string('name').comment('name');
        t.integer('age').comment('age');
      }).catch((err) => service_logger.error(err));
    }
  }

  async dropTable() {
    if(await db.schema.hasTable(this.TABLE_NAME)) {
      await db.schema.dropTable(this.TABLE_NAME);
    }
  }

  async exists(options: DaoType<DemoType> = {}): Promise<boolean> {
    const _model = DataOptions(options.model);
    const result = await db.table(this.TABLE_NAME).select().where(_model);
    if(result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  async add(test: DemoType): Promise<number>{
    const result = await db.table(this.TABLE_NAME)
      .insert<DemoType>(test)
      .catch((err) => service_logger.error(err));
    return result[0]; // 自定义id添加成功返回0 || 自增id添加成功返回增加的id
  }

  async delete(options: DaoType<DemoType> = {}): Promise<number> {
    const _model = DataOptions(options.model);
    const result = await db.table(this.TABLE_NAME).delete().where(_model);
    return result;
  }

  async update(modelWhere: DemoType, model: DemoType): Promise<number> {
    const _model = DataOptions(model);
    const _modelWhere = DataOptions(modelWhere);
    const result = db(this.TABLE_NAME).where(_modelWhere).update(_model);
    return result;
  }

  async getModel(options: DaoType<DemoType> = {}) {
    const _model = DataOptions(options.model);
    const result = await db.table(this.TABLE_NAME).select().where(_model);
    return result[0];
  }
  
  async getList (options: DaoType<DemoType> = {}): Promise<DemoType[]> {
    const _model = DataOptions(options.model);
    let result = db(this.TABLE_NAME).where(_model);
    result = dbHelper.handlePaging(result, options.pageNo, options.pageSize);
    result.catch((err) => service_logger.error(err));
    return result;
  }

  async getRecordCount(options: DaoType<DemoType> = {}): Promise<number> {
    const _model = DataOptions(options.model);
    const count = await db.table(this.TABLE_NAME).count('* as count').where(_model);
    return count[0]['count'];
  }

}


export const demoDao = new Demo();