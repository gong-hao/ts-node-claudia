import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IParams } from '../../interface/params';
import { IResult } from '../../interface/result';
import { ITodo } from '../../interface/todo';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/validator';
import { FindOneById } from '../commonActions/findOneById';
import { UpdateOneById } from '../commonActions/updateOneById';

export const TodoToggle = async (req: express.Request): Promise<IResult<any>> => {
  const query = await Validator<IParams>(req.params, IdSchema);
  const todo = await FindOneById<ITodo>(query.ID, DocName.Todos);
  if (!todo) {
    return { statusCode: 404, message: 'not found' };
  }
  const Done = !todo.Done;
  const DoneOn = Done ? new Date() : null;
  const data = { Done, DoneOn };
  await UpdateOneById(todo._id, data, DocName.Todos);
  return { statusCode: 200 };
};
