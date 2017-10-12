import * as joi from 'joi';

import { JoiObjectID } from './type/joiObjectID';

export const IdSchema = joi.object().keys({
  ID: JoiObjectID.required()
});

export const IdsSchema = joi.object().keys({
  IDs: joi.array().items(JoiObjectID)
});
