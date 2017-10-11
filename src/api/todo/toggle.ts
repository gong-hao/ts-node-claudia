import * as express from 'express';

import { GetDb } from '../../conn';
import { DocName } from '../../enum/docName';
import { ITodo } from '../../interface/todo';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { FindOneById } from '../commonActions/findOneById';

const Toggle = async (todo: ITodo) => {
  const db = await GetDb();
  const Done = !todo.Done;
  const DoneOn = Done ? new Date() : null;
  const conditions = {
    _id: todo._id
  }
  const update = {
    $set: { Done, DoneOn }
  };
  return await db.collection(DocName.Todos)
    .updateOne(conditions, update);
};

export const TodoToggle = async (req: express.Request) => {
  const query = await Validator<{ ID: string }>(req.params, IdSchema);
  const todo = await FindOneById<ITodo>(query.ID, DocName.Todos);
  if (!todo) {
    return { statusCode: 404, message: 'not found' };
  }
  const result = await Toggle(todo);
  return { statusCode: 200 };
};
