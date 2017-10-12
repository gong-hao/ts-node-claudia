import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IParams } from '../../interface/params';
import { IResult } from '../../interface/result';
import { IdSchema } from '../../joi/id';
import { Validator } from '../../joi/validator';
import { DeleteOneById } from '../commonActions/deleteOneById';

export const TodoDelete = async (req: express.Request): Promise<IResult<any>> => {
  const query = await Validator<IParams>(req.params, IdSchema);
  const result = await DeleteOneById(query.ID, DocName.Todos);
  return { statusCode: 204 };
};
