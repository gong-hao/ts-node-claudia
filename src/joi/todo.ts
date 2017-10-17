import * as joi from 'joi';

export const QueryTodoSchema = joi.object().keys({
  Title: joi.string().allow([null, '']).trim().optional()
});

export const CreateTodoSchema = joi.object().keys({
  Title: joi.string().trim().required(),
  Done: joi.boolean().default(false),
  CreateOn: joi.date().default(Date, 'now').forbidden(),
  DoneOn: joi.date()
    .when('Done', {
      is: true,
      then: joi.date().default(Date, 'now').forbidden(),
      otherwise: joi.date().default(null).forbidden()
    })
});

export const ModifyTodoSchema = joi.object().keys({
  Title: joi.string().trim().required()
});
