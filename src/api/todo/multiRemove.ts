import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IResult } from '../../interface/result';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/share/validator';
import { DeleteManyByIds } from '../commonActions/deleteManyByIds';

export const TodoMultiRemove = async (req: express.Request): Promise<IResult<any>> => {
  const body = await Validator<any>(req.body, IdSchema);
  const result = await DeleteManyByIds(body.IDs, DocName.Todos)
  return { statusCode: 204 };
};
