import * as joi from 'joi';

import { JoiObjectID } from './type/joiObjectID';

export const IdSchema = joi.object().keys({
  ID: JoiObjectID.required()
});

export const IdsSchema = joi.object().keys({
  IDs: joi.array().items(JoiObjectID)
});

export const PagingSchema = joi.object().keys({
  Page: joi.number().integer().min(1).default(1).optional(),
  Limit: joi.number().integer().min(1).default(10).optional(),
  Sort: joi.string().regex(/[+-]?[0-9a-zA-Z]*[,]?/).optional()
});

export const Validator = {
  validate: <T>(input, schema) => {
    return new Promise<T>((resolve, reject) => {
      joi.validate(input, schema, { stripUnknown: true }, (err, value) => {
        if (err) {
          err['errorType'] = 'InvalidParameters';
          return reject(err);
        }
        resolve(value);
      });
    });
  }
}
