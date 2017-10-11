import * as express from 'express';

import { DocName } from '../../enum/docName';
import { ITodo } from '../../interface/todo';
import { PagingSchema } from '../../joi/paging';
import { Validator } from '../../joi/share/validator';
import { QueryTodoSchema } from '../../joi/todo';
import { FindWithPaging } from '../commonActions/findWithPaging';

export const TodoList = async (req: express.Request) => {
  const query = await Validator<ITodo>(req.query, QueryTodoSchema);
  const paging = await Validator<ITodo>(req.query, PagingSchema);
  const conditions: any = {};
  if (query.Title) {
    conditions.Title = { $regex: query.Title }
  }
  const data = await FindWithPaging(conditions, DocName.Todos, req.url, paging);
  return { statusCode: 200, data };
};
