import * as express from 'express';

import { DocName } from '../../enum/docName';
import { ITodo } from '../../interface/todo';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { FindOneById } from '../commonActions/findOneById';
import { UpdateOneById } from '../commonActions/updateOneById';

export const TodoToggle = async (req: express.Request) => {
  const query = await Validator<{ ID: string }>(req.params, IdSchema);
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
