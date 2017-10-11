import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { FindOneById } from '../commonActions/findOneById';

export const TodoDetail = async (req: express.Request) => {
  const query = await Validator<{ ID: string }>(req.params, IdSchema);
  const todo = await FindOneById(query.ID, DocName.Todos);
  if (!todo) {
    return { statusCode: 404, message: 'not found' };
  }
  return { statusCode: 200, data: todo };
};
