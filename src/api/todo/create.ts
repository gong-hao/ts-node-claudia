import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IResult } from '../../interface/result';
import { ITodo } from '../../interface/todo';
import { Validator } from '../../joi/share/validator';
import { CreateTodoSchema } from '../../joi/todo';
import { InsertOne } from '../commonActions/insertOne';

export const TodoCreate = async (req: express.Request): Promise<IResult<any>> => {
  const body = await Validator<ITodo>(req.body, CreateTodoSchema);
  const result = await InsertOne<ITodo>(body, DocName.Todos);
  return { statusCode: 201, data: { insertedId: result.insertedId } };
};
