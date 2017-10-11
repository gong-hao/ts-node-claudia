import * as joi from 'joi';

import { JoiObjectId } from './type/joiObjectId';

export const IdSchema = joi.object().keys({
  ID: JoiObjectId.required()
});

export const IdsSchema = joi.object().keys({
  IDs: joi.array().items(JoiObjectId)
});
