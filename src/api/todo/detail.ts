import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IParams } from '../../interface/params';
import { IResult } from '../../interface/result';
import { ITodo } from '../../interface/todo';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { FindOneById } from '../commonActions/findOneById';

export const TodoDetail = async (req: express.Request): Promise<IResult<ITodo>> => {
  const query = await Validator<IParams>(req.params, IdSchema);
  const todo = await FindOneById<ITodo>(query.ID, DocName.Todos);
  if (!todo) {
    return { statusCode: 404, message: 'not found' };
  }
  return { statusCode: 200, data: todo };
};
