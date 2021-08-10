import { QueryBuilder } from 'knex';

function handlePaging(queryBuilder: QueryBuilder, pageNo: number, pageSize: number): QueryBuilder {
  return pageNo && pageSize
    ? queryBuilder.limit(pageSize).offset((pageNo - 1) * pageSize)
    : queryBuilder;
}

function handleLikeWhere(
  queryBuilder: QueryBuilder,
  model: { [column: string]: any }): QueryBuilder {
  const validKeys = Object.keys(model).filter(key => model[key]);
  validKeys.forEach(key => {
    queryBuilder = queryBuilder.andWhere(key, 'like', `%${model[key]}%`);
  });
  return queryBuilder;
}

function handleInWhere(
  queryBuilder: QueryBuilder,
  model: { [column: string]: any }): QueryBuilder {
  const validKeys = Object.keys(model).filter(key => model[key]);
  validKeys.forEach(key => {
    queryBuilder = queryBuilder.whereIn(key, model[key]);
  });
  return queryBuilder;
}

export const dbHelper = {
  handlePaging,
  handleLikeWhere,
  handleInWhere
};