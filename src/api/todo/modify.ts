import * as express from 'express';

import { DocName } from '../../enum/docName';
import { ITodo } from '../../interface/todo';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { ModifyTodoSchema } from '../../joi/todo';
import { UpdateOneById } from '../commonActions/updateOneById';

export const TodoModify = async (req: express.Request) => {
  const query = await Validator<{ ID: string }>(req.params, IdSchema);
  const body = await Validator<ITodo>(req.body, ModifyTodoSchema);
  const result = await UpdateOneById(query.ID, body, DocName.Todos);
  return { statusCode: 201 };
};
