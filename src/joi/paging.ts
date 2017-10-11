import * as joi from 'joi';

export const PagingSchema = joi.object().keys({
  Page: joi.number().integer().min(1).default(1).optional(),
  Limit: joi.number().integer().min(1).default(10).optional(),
  Sort: joi.string().regex(/[+-]?[0-9a-zA-Z]*[,]?/).optional()
});
