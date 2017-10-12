import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IParams } from '../../interface/params';
import { IResult } from '../../interface/result';
import { ITodo } from '../../interface/todo';
import { IdSchema } from '../../joi/id';
import { ModifyTodoSchema } from '../../joi/todo';
import { Validator } from '../../joi/validator';
import { UpdateOneById } from '../commonActions/updateOneById';

export const TodoModify = async (req: express.Request): Promise<IResult<any>> => {
  const query = await Validator<IParams>(req.params, IdSchema);
  const body = await Validator<ITodo>(req.body, ModifyTodoSchema);
  const result = await UpdateOneById(query.ID, body, DocName.Todos);
  return { statusCode: 201 };
};
