import * as express from 'express';

import { DocName } from '../../enum/docName';
import { ITodo } from '../../interface/todo';
import { Validator } from '../../joi/share/validator';
import { CreateTodoSchema } from '../../joi/todo';
import { InsertOne } from '../commonActions/insertOne';

export const TodoCreate = async (req: express.Request) => {
  const body = await Validator<ITodo>(req.body, CreateTodoSchema);
  const result = await InsertOne(body, DocName.Todos);
  return { statusCode: 201, insertedId: result.insertedId };
};
