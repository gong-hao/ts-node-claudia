import * as express from 'express'

import { TodoSchema } from '.'
import { IdParams } from '../../models/controller/params'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { Todo } from '../../models/todo'
import { CommonQueryService } from '../../service/common-query.service'
import { BaseSchema } from '../../validation/base-schema'
import { Validator } from '../../validation/validator'


const controller = async (req: express.Request): Promise<Result<any>> => {
  const params = await Validator.validate<IdParams>(req.params, BaseSchema.id())
  const body = await Validator.validate<Todo>(req.body, TodoSchema.modify())
  const update = {
    $set: body
  }
  const result = await CommonQueryService.updateOneById(params.ID, update, DocName.Todo)
  if (result.modifiedCount === 0) {
    return { statusCode: 404, message: 'todo not found' }
  }
  return { statusCode: 201 }
}

export const TodoModify = {
  controller
}
