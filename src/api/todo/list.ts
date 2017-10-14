import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IPaging } from '../../interface/paging';
import { IResult } from '../../interface/result';
import { ITodo } from '../../interface/todo';
import { PagingSchema } from '../../joi/paging';
import { QueryTodoSchema } from '../../joi/todo';
import { Validator } from '../../joi/validator';
import { FindWithPaging } from '../commonActions/findWithPaging';
import { EscapeStringRegex } from '../share/escapeStringRegex';

export const TodoList = async (req: express.Request): Promise<IResult<ITodo[]>> => {
  const query = await Validator<ITodo>(req.query, QueryTodoSchema);
  const paging = await Validator<IPaging>(req.query, PagingSchema);
  const conditions: any = {};
  if (query.Title) {
    conditions.Title = { $regex: EscapeStringRegex(query.Title) }
  }
  const result = await FindWithPaging<ITodo>(conditions, DocName.Todos, req.url, paging);
  return { statusCode: 200, ...result };
};
