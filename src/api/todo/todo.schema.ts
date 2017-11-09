import * as joi from 'joi'

const list = () => joi.object().keys({
  Title: joi.string().trim().allow('').optional()
})

const fields = {
  Title: joi.string().trim().required()
}

const create = () => joi.object().keys({
  ...fields,
  IsDone: joi.boolean().default(false),
  CreateOn: joi.date().default(new Date()).forbidden(),
  DoneOn: joi.date()
    .when('IsDone', {
      is: true,
      then: joi.date().default(new Date()).forbidden(),
      otherwise: joi.date().default(null).forbidden()
    })
})

const modify = () => joi.object().keys({
  ...fields
})

export const TodoSchema = {
  list,
  create,
  modify
}
