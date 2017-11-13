import * as joi from 'joi'

const objectID = () => joi.string().trim().regex(/^[0-9a-fA-F]{24}$/)

const id = () => joi.object().keys({
  ID: objectID().required()
})

const ids = () => joi.object().keys({
  IDs: joi.array().items(objectID())
})

const paging = () => joi.object().keys({
  Page: joi.number().integer().min(1).default(1).optional(),
  Limit: joi.number().integer().min(1).default(10).optional(),
  Sort: joi.string().regex(/[+-]?[0-9a-zA-Z]*[,]?/).allow('').optional()
})

export const BaseSchema = {
  objectID,
  id,
  ids,
  paging
}
