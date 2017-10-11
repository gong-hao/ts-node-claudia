import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { DeleteOneById } from '../commonActions/deleteOneById';

export const TodoDelete = async (req: express.Request) => {
  const query = await Validator<{ ID: string }>(req.params, IdSchema);
  const result = await DeleteOneById(query.ID, DocName.Todos);
  return { statusCode: 204 };
};
